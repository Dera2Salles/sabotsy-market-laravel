import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getWordPressConfig } from '@/config/wordpress.config';
import { createWordPressService, WordPressService } from '@/services/wordpress/wordpress.service';
import { WordPressReview } from '@/services/wordpress/wordpress.types';
import { WordPressApi } from '@/services/wordpress/wordpressApi';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Check, Loader2, Star, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ReviewsManager() {
  const [pendingReviews, setPendingReviews] = useState<WordPressReview[]>([]);
  const [approvedReviews, setApprovedReviews] = useState<WordPressReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [wpService, setWpService] = useState<WordPressService | null>(null);

  useEffect(() => {
    const config = getWordPressConfig();
    if (!config) return;
    const api = new WordPressApi(config);
    const service = createWordPressService(api);
    setWpService(service);
    fetchReviews(service);
  }, []);

  const fetchReviews = async (service: WordPressService) => {
    setLoading(true);
    try {
      // Get pending
      const pending = await service.getReviews('pending');
      if (pending.success && pending.data) {
        setPendingReviews(pending.data);
      }
      
      // Get approved
      const approved = await service.getReviews('publish');
      if (approved.success && approved.data) {
        setApprovedReviews(approved.data);
      }

    } catch (error) {
      console.error('Failed to fetch reviews', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, status: 'publish' | 'trash') => {
    if (!wpService) return;
    
    try {
      await wpService.updateReviewStatus(id, status);
      fetchReviews(wpService);
    } catch (error) {
        console.error("Failed to update status", error);
    }
  };

  const ReviewCard = ({ review, isPending }: { review: WordPressReview, isPending: boolean }) => (
    <Card className="bg-white dark:bg-card border-none shadow-sm mb-4">
        <CardContent className="p-6">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                         <span className="font-bold text-brand-primary-navy dark:text-gray-200">{review.title.rendered}</span>
                         <span className="text-xs text-gray-400">• {format(new Date(review.date), 'dd MMM yyyy', { locale: fr })}</span>
                         {review.acf?.author_email && <span className="text-xs text-gray-400">• {review.acf.author_email}</span>}
                    </div>
                    <div className="flex mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                                key={i} 
                                className={`w-4 h-4 ${(i < (review.acf?.rating || 0)) ? 'fill-brand-gold text-brand-gold' : 'text-gray-300'}`} 
                            />
                        ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        "{review.content.rendered.replace(/<[^>]*>?/gm, '')}" 
                        {/* Strip HTML tags assuming content comes as HTML */}
                    </p>
                </div>
                
                {isPending && (
                    <div className="flex gap-2 shrink-0 ml-4">
                        <Button 
                            size="sm" 
                            variant="destructive" 
                            className="h-8 w-8 p-0 min-w-0 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                            onClick={() => handleStatusChange(review.id, 'trash')}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                        <Button 
                            size="sm" 
                            className="h-8 w-8 p-0 min-w-0 rounded-full bg-green-100 hover:bg-green-200 text-green-600"
                            onClick={() => handleStatusChange(review.id, 'publish')}
                        >
                            <Check className="w-4 h-4" />
                        </Button>
                    </div>
                )}
                 {!isPending && (
                    <div className="flex gap-2 shrink-0 ml-4">
                        <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-gray-400 hover:text-red-500"
                            onClick={() => handleStatusChange(review.id, 'trash')}
                        >
                            <span className="sr-only">Delete</span>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>
        </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Pending Reviews */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-brand-primary-navy flex items-center gap-2">
                En attente 
                {pendingReviews.length > 0 && (
                    <Badge variant="secondary" className="bg-brand-gold text-white">{pendingReviews.length}</Badge>
                )}
            </h3>
        </div>
        
        {loading ? (
             <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
        ) : pendingReviews.length === 0 ? (
            <Card className="bg-gray-50 dark:bg-card/50 border-dashed shadow-none">
                <CardContent className="p-8 text-center text-gray-400">
                    <Check className="w-8 h-8 mx-auto mb-2 opacity-20" />
                    <p>Aucun avis en attente.</p>
                </CardContent>
            </Card>
        ) : (
            pendingReviews.map(review => <ReviewCard key={review.id} review={review} isPending={true} />)
        )}
      </div>

      {/* Approved Reviews History */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-brand-primary-navy">Historique Publié</h3>
         {loading ? (
             <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
        ) : approvedReviews.length === 0 ? (
             <p className="text-gray-400 italic">Aucun avis publié pour le moment.</p>
        ) : (
             approvedReviews.map(review => <ReviewCard key={review.id} review={review} isPending={false} />)
        )}
      </div>
    </div>
  );
}
