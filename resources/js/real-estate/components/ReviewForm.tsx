import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getWordPressConfig } from '@/config/wordpress.config';
import { createWordPressService } from '@/services/wordpress/wordpress.service';
import { CreateReviewParams } from '@/services/wordpress/wordpress.types';
import { WordPressApi } from '@/services/wordpress/wordpressApi';
import { Loader2, Send, Star } from 'lucide-react';
import { useState } from 'react';

export function ReviewForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        
        try {
            const config = getWordPressConfig();
            if (!config) throw new Error("Service unavailable");
            
            const api = new WordPressApi(config);
            const service = createWordPressService(api);

            const reviewData: CreateReviewParams = {
                author: name,
                email,
                rating,
                comment,
                status: 'pending' // Default status
            };

            const result = await service.createReview(reviewData);
            if (result.success) {
                setSuccess(true);
                setName('');
                setEmail('');
                setComment('');
                setRating(5);
            }
        } catch (error) {
            console.error('Failed to submit review', error);
            alert("Une erreur est survenue lors de l'envoi de votre avis.");
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <Card className="border-none shadow-lg bg-brand-primary-navy text-white text-center p-8">
                <CardContent className="space-y-4">
                    <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Merci pour votre avis !</h3>
                    <p className="text-gray-300">
                        Votre commentaire a été envoyé et sera visible après modération.
                    </p>
                    <Button 
                        variant="outline" 
                        onClick={() => setSuccess(false)}
                        className="mt-4 border-white text-brand-primary hover:bg-white hover:text-brand-primary-navy"
                    >
                        Écrire un autre avis
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-none shadow-xl bg-white dark:bg-card">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-brand-primary-navy dark:text-white">
                    Partagez votre expérience
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nom</Label>
                            <Input 
                                id="name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                                placeholder="Votre nom"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                placeholder="votre@email.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Note</Label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Star 
                                        className={`w-8 h-8 ${
                                            star <= (hoverRating || rating) 
                                                ? 'fill-brand-gold text-brand-gold' 
                                                : 'text-gray-300'
                                        }`} 
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="comment">Votre message</Label>
                        <Textarea 
                            id="comment" 
                            value={comment} 
                            onChange={(e) => setComment(e.target.value)} 
                            required 
                            placeholder="Racontez-nous votre séjour..."
                            className="min-h-[120px]"
                        />
                    </div>

                    <Button 
                        type="submit" 
                        disabled={submitting}
                        className="w-full bg-brand-primary-navy hover:bg-brand-primary text-white font-bold py-6"
                    >
                        {submitting ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2 w-4 h-4" />}
                        Envoyer mon avis
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
