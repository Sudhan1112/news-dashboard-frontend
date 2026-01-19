'use client';
import { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
export default function ArticleFeed({ searchQuery = '', category = 'Latest News' }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredArticles, setFilteredArticles] = useState([]);
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                // Fetch from Google Blogger API v3
                const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
                // Using a sample blog ID - you can customize this
                const blogId = '6308117797418690963'; // Example blog ID
                const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=10&orderBy=published`);
                if (!response.ok) {
                    throw new Error('Failed to fetch articles');
                }
                const data = await response.json();
                if (data.items) {
                    // Parse and clean article content
                    const parsedArticles = data.items.map((post) => {
                        // Extract first image from content or use placeholder
                        const imageMatch = post.content?.match(/<img[^>]+src="([^">]+)"/);
                        const imageUrl = imageMatch ? imageMatch[1] : '/api/placeholder';
                        return {
                            id: post.id,
                            title: post.title,
                            content: post.content?.replace(/<[^>]*>/g, '').substring(0, 200) || '',
                            published: post.published,
                            author: post.author,
                            labels: post.labels || [],
                            url: post.url,
                            imageUrl: imageUrl,
                        };
                    });
                    setArticles(parsedArticles);
                }
            }
            catch (err) {
                console.error('Error fetching articles:', err);
                setError('Could not load articles. Using demo data.');
                // Fallback to demo articles
                setArticles(getDemoArticles());
            }
            finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);
    // Filter articles based on search query and category
    useEffect(() => {
        let filtered = articles;
        // Filter by category
        if (category !== 'Latest News' && category !== 'More') {
            filtered = filtered.filter((article) => {
                const labels = article.labels?.map((l) => l.toLowerCase()) || [];
                return labels.includes(category.toLowerCase());
            });
        }
        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter((article) => {
                const query = searchQuery.toLowerCase();
                return (article.title.toLowerCase().includes(query) ||
                    article.content.toLowerCase().includes(query) ||
                    article.labels?.some((label) => label.toLowerCase().includes(query)));
            });
        }
        setFilteredArticles(filtered);
    }, [articles, searchQuery, category]);
    if (loading) {
        return (<div className="space-y-4">
        {[1, 2, 3].map((i) => (<div key={i} className="bg-card rounded-lg p-4 animate-pulse">
            <div className="h-48 bg-muted rounded-lg mb-4"/>
            <div className="h-6 bg-muted rounded w-3/4 mb-2"/>
            <div className="h-4 bg-muted rounded w-full"/>
          </div>))}
      </div>);
    }
    return (<div className="space-y-4">
      {error && (<div className="bg-card border border-border rounded-lg p-4 text-sm text-muted-foreground">
          {error}
        </div>)}

      {category !== 'Latest News' && (<div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-card-foreground font-semibold">
            Category: <span className="text-primary">{category}</span>
          </p>
        </div>)}

      {searchQuery && (<div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-card-foreground font-semibold">
            Search: <span className="text-primary">"{searchQuery}"</span> ({filteredArticles.length} results)
          </p>
        </div>)}

      {filteredArticles.length === 0 ? (<div className="bg-card rounded-lg p-8 text-center">
          <p className="text-muted-foreground">
            {searchQuery ? 'No articles match your search' : 'No articles available for this category'}
          </p>
        </div>) : (filteredArticles.map((article) => (<ArticleCard key={article.id} article={article}/>)))}
    </div>);
}
function getDemoArticles() {
    return [
        {
            id: '1',
            title: '25 of the most beautiful places around the world',
            content: 'Explore stunning destinations from the Grand Canyon to tropical beaches...',
            published: new Date(Date.now() - 60000).toISOString(),
            author: { displayName: 'Helena Thornton' },
            labels: ['Travel'],
            url: '#',
            imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        },
        {
            id: '2',
            title: 'Before New York Auto Show, Cars Take Their Own Star Turns',
            content: 'The most anticipated vehicles of the season are getting ready for their big debut...',
            published: new Date(Date.now() - 300000).toISOString(),
            author: { displayName: 'Tillie Benson' },
            labels: ['Business'],
            url: '#',
            imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
        },
        {
            id: '3',
            title: 'U.S. Risks Roiling Oil Markets in Trying to Tighten Sanctions',
            content: 'New sanctions could have significant impacts on global oil markets...',
            published: new Date(Date.now() - 1800000).toISOString(),
            author: { displayName: 'Todd Torres' },
            labels: ['Politics'],
            url: '#',
            imageUrl: 'https://images.unsplash.com/photo-1466611653033-a19db021b3e0?w=800&q=80',
        },
    ];
}
