'use client';
import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
const trendingNews = [
    {
        id: 1,
        category: 'Sport',
        title: 'Tiger Woods, in a Stirring Return to the Top, Captures the Masters at 43',
        views: '24.5K',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=150&h=100&fit=crop',
    },
    {
        id: 2,
        category: 'Health',
        title: '10 Years After an Exercise Study, Benefits Persist',
        views: '18.2K',
        image: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=150&h=100&fit=crop',
    },
    {
        id: 3,
        category: 'Business',
        title: 'Buying a Tesla Seems Pretty Easy. But There Are a Few Things to Know.',
        views: '15.8K',
        image: 'https://images.unsplash.com/photo-1560958089-b8a63c0c3efb?w=150&h=100&fit=crop',
    },
    {
        id: 4,
        category: 'Food',
        title: 'What to cook this week, Top 15 Breakfast.',
        views: '12.3K',
        image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=150&h=100&fit=crop',
    },
    {
        id: 5,
        category: 'Sport',
        title: "Roger Federer's 101 Titles: By the Numbers",
        views: '11.5K',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=150&h=100&fit=crop',
    },
    {
        id: 6,
        category: 'Health',
        title: 'Gene-Edited Babies: What a Chinese Scientist Told an American Mentor',
        views: '9.8K',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=150&h=100&fit=crop',
    },
];
const trendingSections = [
    { name: 'Politics', views: '60,250', trend: 'up' },
    { name: 'Business', views: '45,000', trend: 'down' },
    { name: 'Sports', views: '24,500', trend: 'up' },
    { name: 'Technology', views: '9,850', trend: 'up' },
    { name: 'Food', views: '5,250', trend: 'down' },
];
const popularTags = [
    'Politics',
    'Advertising',
    'News',
    'Development',
    'Design',
    'Finance',
    'Football',
    'Future',
    'Technology',
    'Food',
    'Architecture',
    'Tennis',
    'Style',
    'Real Estate',
    'Photography',
];
export default function TrendingSection() {
    const [selectedTag, setSelectedTag] = useState(null);
    const handleTrendingNewsClick = (title) => {
        console.log('[v0] Trending news clicked:', title);
        alert('Opening: ' + title);
    };
    const handleSectionClick = (sectionName) => {
        console.log('[v0] Trending section clicked:', sectionName);
        alert('Viewing ' + sectionName + ' section');
    };
    const handleTagClick = (tag) => {
        setSelectedTag(tag);
        console.log('[v0] Tag selected:', tag);
    };
    const handleViewAll = (type) => {
        console.log('[v0] View all clicked:', type);
        alert('Showing all ' + type);
    };
    return (<div className="space-y-6">
      {/* Trending News */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-bold text-card-foreground">Trending News</h2>
          <button onClick={() => handleViewAll('Trending News')} className="text-primary text-sm font-semibold hover:underline transition-colors">
            →
          </button>
        </div>

        <div className="divide-y divide-border">
          {trendingNews.map((news, index) => (<div key={news.id} onClick={() => handleTrendingNewsClick(news.title)} className="flex gap-3 p-4 hover:bg-muted transition-colors cursor-pointer group">
              {/* Image */}
              <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                <img src={news.image || "/placeholder.svg"} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" onError={(e) => {
                e.target.src =
                    'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=150&h=100&fit=crop';
            }}/>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-primary mb-1">{news.category}</p>
                <p className="text-sm font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {news.title}
                </p>
              </div>
            </div>))}
        </div>
      </div>

      {/* Trending Sections */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-bold text-card-foreground">Trending Sections</h2>
          <button onClick={() => handleViewAll('Trending Sections')} className="text-primary text-sm font-semibold hover:underline transition-colors">
            →
          </button>
        </div>

        <div className="divide-y divide-border">
          {trendingSections.map((section) => (<div key={section.name} onClick={() => handleSectionClick(section.name)} className="flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors cursor-pointer group">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                  {section.trend === 'up' ? <TrendingUp className="w-4 h-4"/> : '▼'}
                </div>
                <span className="font-semibold text-card-foreground text-sm group-hover:text-primary transition-colors">
                  {section.name}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">{section.views} Views</span>
            </div>))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-card-foreground">Popular Tags</h2>
          <button onClick={() => handleViewAll('Popular Tags')} className="text-primary text-sm font-semibold hover:underline transition-colors">
            +
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (<button key={tag} onClick={() => handleTagClick(tag)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${selectedTag === tag
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground'}`}>
              {tag}
            </button>))}
        </div>
      </div>
    </div>);
}
