'use client';

import { BlogCard } from '@/app/blog-viewer/components/BlogCard';
import { BlogPost } from '@/app/blog-viewer/components/BlogPost';
import { Button } from '@/components/ui/button';
import { getWordPressConfig } from '@/config/wordpress.config';
import { useWordPress } from '@/hooks/useWordPress';
import { WordPressPost } from '@/services/wordpress';
import { ExternalLink, Loader2, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PostsPreviewPage() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<WordPressPost | null>(null);
  
  // Use config to ensure we have auth context
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const wpConfig = getWordPressConfig();
  const wordpress = useWordPress();

  useEffect(() => {
    loadPosts();
  }, [wordpress]);

  const loadPosts = async () => {
    if (!wordpress) return;
    setIsLoading(true);
    try {
      const response = await wordpress.getPosts({
        status: ['publish', 'draft', 'future', 'pending', 'private'].join(','), // Fetch all statuses for admin
        per_page: 12
      });
      if (response.success && response.data) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostClick = (post: WordPressPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedPost(null);
  };

  if (selectedPost) {
    return (
      <div className="bg-background min-h-full">
         <BlogPost post={selectedPost} onBack={handleBack} />
      </div>
    );
  }

  return (
    <div className="p-10 space-y-10 min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-brand-primary-navy dark:text-white">Aperçu des Posts</h1>
          <p className="text-gray-500 mt-2 text-lg">Visualisez et gérez vos publications en direct.</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" onClick={loadPosts} disabled={isLoading}>
                <RefreshCw size={18} className={isLoading ? "animate-spin mr-2" : "mr-2"} />
                Actualiser
            </Button>
            <Button 
                className="flex items-center gap-2 font-bold"
                onClick={() => window.open('/', '_blank')}
            >
            <ExternalLink size={18} /> Voir le site public
            </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
           <Loader2 className="h-12 w-12 animate-spin text-brand-primary" />
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <div key={post.id} className="relative group">
                <BlogCard 
                    post={post} 
                    onClick={() => handlePostClick(post)} 
                />
                {/* Admin Status Badge Overlay */}
                <div className="absolute top-4 right-4 z-20">
                    <span className={`
                        px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm
                        ${post.status === 'publish' ? 'bg-green-100 text-green-800' : 
                          post.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                          post.status === 'private' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'}
                    `}>
                        {post.status}
                    </span>
                </div>
            </div>
          ))}
        </div>
      ) : (
          <div className="text-center py-20 bg-white dark:bg-card rounded-3xl border border-dashed border-gray-300">
              <p className="text-xl text-gray-500">Aucun article trouvé.</p>
              <Button className="mt-4" onClick={() => window.location.href = '/admin/blog-editor'}>
                  Créer un article
              </Button>
          </div>
      )}
    </div>
  );
}
