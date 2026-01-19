'use client';
import React from "react";
import { useState } from 'react';
import { BookmarkIcon, ShareIcon } from 'lucide-react';
export default function ArticleCard({ article }) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const timeAgo = getTimeAgo(article.published);
    const category = article.labels?.[0] || 'News';
    const handleBookmark = (e) => {
        e.preventDefault();
        setIsBookmarked(!isBookmarked);
        console.log('[v0] Article bookmarked:', article.title);
    };
    const handleShare = (e) => {
        e.preventDefault();
        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.content,
                url: article.url,
            });
        }
        else {
            console.log('[v0] Share:', article.url);
            alert('Shared: ' + article.title);
        }
    };
    const handleArticleClick = () => {
        window.open(article.url, '_blank');
    };
    return (<article className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-border">
      {/* Article Image */}
      {article.imageUrl && (<div className="relative w-full h-64 overflow-hidden bg-muted">
          <img src={article.imageUrl || "/placeholder.svg"} alt={article.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" onError={(e) => {
                e.target.src =
                    'https://images.unsplash.com/photo-1516321318423-f06f70d504d0?w=800&q=80';
            }}/>
          {/* Category Badge */}
          <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
            {category}
          </div>
        </div>)}

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <button onClick={handleArticleClick} className="text-xl font-bold text-card-foreground mb-2 line-clamp-2 hover:text-primary cursor-pointer transition-colors text-left w-full">
          {article.title}
        </button>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {article.content || 'Read more about this article...'}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            {article.author.image?.url && (<img src={article.author.image.url || "/placeholder.svg"} alt={article.author.displayName} className="w-8 h-8 rounded-full object-cover" onError={(e) => {
                e.target.style.display = 'none';
            }}/>)}
            <div className="text-xs">
              <p className="font-semibold text-card-foreground">{article.author.displayName}</p>
              <p className="text-muted-foreground">{timeAgo}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button onClick={handleBookmark} className={`p-1 rounded transition-colors ${isBookmarked
            ? 'text-primary'
            : 'text-muted-foreground hover:text-primary'}`} aria-label="Bookmark article">
              <BookmarkIcon className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"}/>
            </button>
            <button onClick={handleShare} className="text-muted-foreground hover:text-primary p-1 rounded transition-colors" aria-label="Share article">
              <ShareIcon className="w-4 h-4"/>
            </button>
          </div>
        </div>
      </div>
    </article>);
}
function getTimeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (secondsAgo < 60)
        return 'just now';
    if (secondsAgo < 3600)
        return `${Math.floor(secondsAgo / 60)}m ago`;
    if (secondsAgo < 86400)
        return `${Math.floor(secondsAgo / 3600)}h ago`;
    if (secondsAgo < 604800)
        return `${Math.floor(secondsAgo / 86400)}d ago`;
    return date.toLocaleDateString();
}
