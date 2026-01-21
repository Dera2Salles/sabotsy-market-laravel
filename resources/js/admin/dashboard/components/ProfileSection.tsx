import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWordPress } from '@/hooks/useWordPress';
import { UpdateUserParams, WordPressUser } from '@/services/wordpress';
import { Loader2, Save, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function ProfileSection() {
  const wpService = useWordPress();
  const [user, setUser] = useState<WordPressUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!wpService) return;
      
      try {
        const response = await wpService.getCurrentUser();
        if (response.success && response.data) {
          setUser(response.data);
          setFormData({
            first_name: response.data.first_name || '',
            last_name: response.data.last_name || '',
            email: response.data.email || '',
            password: '', 
          });
        } else {
          toast.error('Impossible de charger le profil');
        }
      } catch (error) {
        toast.error('Erreur lors du chargement du profil');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [wpService]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wpService || !user) return;

    setIsSaving(true);
    try {
      const updateParams: UpdateUserParams = {
        id: user.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        ...(formData.password ? { password: formData.password } : {}),
      };

      const response = await wpService.updateUser(updateParams);
      
      if (response.success) {
        toast.success('Profil mis à jour avec succès !');
        // Update local user state if needed or re-fetch
        if (response.data) {
            setUser(response.data);
            // If password changed, maybe warn about re-login?
        }
      } else {
        toast.error(response.error?.message || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      toast.error('Erreur serveur lors de la mise à jour');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-gold" /></div>;
  }

  return (
    <Card className="bg-white dark:bg-card border-none shadow-md rounded-3xl overflow-hidden">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-8">
        <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-brand-primary-navy/10 rounded-2xl flex items-center justify-center">
                <User size={32} className="text-brand-primary-navy" />
            </div>
            <div>
                <CardTitle className="text-2xl font-bold text-brand-primary-navy dark:text-white">Mon Profil</CardTitle>
                <CardDescription className="text-gray-500">
                Gérez vos informations personnelles et vos identifiants de connexion.
                </CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="pt-8">
        <form onSubmit={handleUpdate} className="space-y-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="font-bold text-gray-700 dark:text-gray-300">Prénom</Label>
              <Input
                id="firstName"
                value={formData.first_name}
                onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-brand-gold/20 focus:border-brand-gold h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="font-bold text-gray-700 dark:text-gray-300">Nom</Label>
              <Input
                id="lastName"
                value={formData.last_name}
                onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-brand-gold/20 focus:border-brand-gold h-12 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-bold text-gray-700 dark:text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-brand-gold/20 focus:border-brand-gold h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Label htmlFor="password" className="font-bold text-gray-700 dark:text-gray-300">Nouveau Mot de Passe (Laisser vide pour ne pas changer)</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-brand-gold/20 focus:border-brand-gold h-12 rounded-xl"
            />
            <p className="text-xs text-gray-500">Un nouveau mot de passe vous déconnectera peut-être de vos autres sessions.</p>
          </div>

          <div className="pt-6">
            <Button 
                type="submit" 
                disabled={isSaving}
                className="bg-brand-primary hover:bg-brand-primary-light text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-brand-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
                {isSaving ? (
                    <Loader2 className="animate-spin mr-2" />
                ) : (
                    <Save className="mr-2 h-4 w-4" />
                )}
                Enregistrer les modifications
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
