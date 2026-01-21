import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getWordPressConfig } from '@/config/wordpress.config';
import { createWordPressService } from '@/services/wordpress/wordpress.service';
import { WordPressReview } from '@/services/wordpress/wordpress.types';
import { WordPressApi } from '@/services/wordpress/wordpressApi';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Loader2, Quote, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ReviewForm } from './ReviewForm';

export function ReviewsSection() {
    const [reviews, setReviews] = useState<WordPressReview[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            const config = getWordPressConfig();
            if (!config) {
                setLoading(false);
                return;
            }
            const api = new WordPressApi(config);
            const service = createWordPressService(api);

            try {
                const response = await service.getReviews('publish');
                if (response.success && response.data) {
                    setReviews(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch reviews', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    return (
        <section className="py-24 bg-white dark:bg-black/20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left: Reviews List */}
                    <div className="flex-1">
                        <div className="mb-12">
                            <span className="text-brand-primary font-semibold tracking-wide uppercase text-sm">
                                Témoignages
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4 text-brand-primary-navy dark:text-white">
                                Ce qu'ils disent de nous
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-lg">
                                La satisfaction de nos voyageurs et propriétaires est notre plus belle récompense.
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex justify-center p-12"><Loader2 className="animate-spin text-brand-primary w-10 h-10" /></div>
                        ) : reviews.length === 0 ? (
                            <div className="p-8 border-2 border-dashed border-gray-200 rounded-2xl text-center text-gray-400">
                                Soyez le premier à laisser un avis !
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {reviews.map((review) => (
                                    <div key={review.id} className="group relative pl-8 pb-8 border-l-2 border-brand-primary/20 last:border-0 last:pb-0">
                                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-brand-primary ring-4 ring-white dark:ring-card transition-all group-hover:scale-125" />
                                        
                                        <div className="flex items-start gap-4">
                                             <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.acf?.author_email || 'User'}`} />
                                                <AvatarFallback>{review.title.rendered.substring(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 bg-gray-50 dark:bg-card p-6 rounded-2xl rounded-tl-none shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className="font-bold text-brand-primary-navy dark:text-white">{review.title.rendered}</h4>
                                                        <span className="text-xs text-brand-secondary">
                                                            {format(new Date(review.date), 'dd MMMM yyyy', { locale: fr })}
                                                        </span>
                                                    </div>
                                                    <div className="flex">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <Star 
                                                                key={i} 
                                                                className={`w-4 h-4 ${(i < (review.acf?.rating || 0)) ? 'fill-brand-gold text-brand-gold' : 'text-gray-200'}`} 
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-300 italic text-sm relative z-10">
                                                    <Quote className="w-8 h-8 text-brand-primary/5 absolute -top-2 -left-2 -z-10 transform -scale-x-100" />
                                                    {review.content.rendered.replace(/<[^>]*>?/gm, '')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Review Form */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-24">
                            <ReviewForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
