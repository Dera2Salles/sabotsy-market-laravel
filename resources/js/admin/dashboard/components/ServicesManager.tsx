import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getWordPressConfig } from '@/config/wordpress.config';
import { createWordPressService, WordPressService } from '@/services/wordpress/wordpress.service';
import { CreatePackageParams, WordPressPackage } from '@/services/wordpress/wordpress.types';
import { WordPressApi } from '@/services/wordpress/wordpressApi';
import { Check, Loader2, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ServicesManager() {
  const [packages, setPackages] = useState<WordPressPackage[]>([]);
  const [extras, setExtras] = useState<WordPressPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [wpService, setWpService] = useState<WordPressService | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');
  const [type, setType] = useState<'package' | 'extra'>('package');
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    // Initialize service on client side to access localStorage/config
    const config = getWordPressConfig();
    if (!config) return;
    const api = new WordPressApi(config);
    const service = createWordPressService(api);
    setWpService(service);
    fetchData(service);
  }, []);

  const fetchData = async (service: WordPressService) => {
    setLoading(true);
    try {
      // Fetch both packages and extras. 
      // Note: In a real WP scenario, we might need to filter client-side if the API doesn't support complex meta queries out of the box without authentication
      const response = await service.getPackages(); 
      if (response.success && response.data) {
        setPackages(response.data.filter(p => !p.acf?.type || p.acf.type === 'package'));
        setExtras(response.data.filter(p => p.acf?.type === 'extra'));
      }
    } catch (error) {
      console.error('Failed to fetch packages', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wpService) return;

    setSubmitting(true);
    try {
      const features = featuresInput.split('\n').filter(f => f.trim() !== '');
      
      const newPackage: CreatePackageParams = {
        title,
        price,
        subtitle,
        description,
        features,
        highlight,
        type,
        status: 'publish'
      };

      const result = await wpService.createPackage(newPackage);
      if (result.success) {
        // Reset form
        setTitle('');
        setPrice('');
        setSubtitle('');
        setDescription('');
        setFeaturesInput('');
        setHighlight(false);
        // Refresh list
        fetchData(wpService);
      } else {
        alert('Erreur lors de la création');
      }
    } catch (error) {
      console.error('Error creating package', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!wpService || !confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
    
    try {
      await wpService.deletePackage(id);
      fetchData(wpService);
    } catch (error) {
        console.error("Failed to delete", error);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="border-none shadow-md bg-white dark:bg-card">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-brand-primary-navy dark:text-white">
            Ajouter une Offre ou un Extra
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Type</Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={type === 'package' ? 'default' : 'outline'}
                    onClick={() => setType('package')}
                    className={type === 'package' ? 'bg-brand-primary-navy' : ''}
                  >
                    Pack de Gestion
                  </Button>
                  <Button
                    type="button"
                    variant={type === 'extra' ? 'default' : 'outline'}
                    onClick={() => setType('extra')}
                    className={type === 'extra' ? 'bg-brand-primary-navy' : ''}
                  >
                    Extra / Option
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={type === 'package' ? "Ex: Pack Essentiel" : "Ex: Ménage"}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Prix</Label>
                <Input
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Ex: 15% ou 50€"
                  required
                />
              </div>

              {type === 'package' && (
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Sous-titre Prix</Label>
                  <Input
                    id="subtitle"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Ex: du CA généré"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
               <Label htmlFor="description">Description courte</Label>
               <Input 
                 id="description"
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 placeholder="Description affichée sur la carte"
               />
            </div>

            {type === 'package' && (
              <div className="space-y-2">
                <Label htmlFor="features">Fonctionnalités (une par ligne)</Label>
                <Textarea
                  id="features"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="- Gestion des clés&#10;- Ménage inclus&#10;- Support 24/7"
                  rows={5}
                />
              </div>
            )}

            {type === 'package' && (
                <div className="flex items-center space-x-2">
                    <input 
                        type="checkbox" 
                        id="highlight" 
                        checked={highlight} 
                        onChange={(e) => setHighlight(e.target.checked)}
                        className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                    />
                    <Label htmlFor="highlight">Mettre en avant (Populaire)</Label>
                </div>
            )}

            <Button type="submit" disabled={submitting} className="bg-brand-primary-navy hover:bg-brand-primary text-white w-full md:w-auto">
              {submitting ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2 h-4 w-4" />}
              Créer {type === 'package' ? "l'offre" : "l'extra"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Packages List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-brand-primary-navy">Vos Packs Actifs</h3>
          {loading ? (
            <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
          ) : packages.length === 0 ? (
            <p className="text-gray-500 italic">Aucun pack configuré.</p>
          ) : (
            packages.map((pkg) => (
              <Card key={pkg.id} className="relative overflow-hidden group">
                 {pkg.acf?.highlight && <div className="absolute top-0 right-0 bg-brand-gold text-xs px-2 py-1 font-bold">POPULAIRE</div>}
                <CardContent className="p-6 flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg">{pkg.title.rendered}</h4>
                    <p className="text-brand-primary font-bold">{pkg.acf?.price} <span className="text-xs text-gray-500 font-normal">{pkg.acf?.subtitle}</span></p>
                    <p className="text-sm text-gray-600 mt-2">{pkg.content.rendered}</p>
                    <ul className="mt-4 space-y-1">
                        {pkg.acf?.features?.split('\n').map((f, i) => (
                             <li key={i} className="text-xs flex items-center gap-2 text-gray-500">
                                <Check className="w-3 h-3 text-brand-primary" /> {f}
                             </li>
                        ))}
                    </ul>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(pkg.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Extras List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-brand-primary-navy">Vos Extras</h3>
          {loading ? (
            <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
          ) : extras.length === 0 ? (
            <p className="text-gray-500 italic">Aucun extra configuré.</p>
          ) : (
            extras.map((extra) => (
                <div key={extra.id} className="flex items-center justify-between p-4 bg-white dark:bg-card rounded-xl border border-gray-100 dark:border-gray-800">
                    <div>
                        <h4 className="font-bold">{extra.title.rendered}</h4>
                        <Badge variant="secondary" className="bg-brand-mint/20 text-brand-primary-dark mt-1">
                            {extra.acf?.price}
                        </Badge>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(extra.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
