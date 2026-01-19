'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import ArticleFeed from '@/components/ArticleFeed';
import TrendingSection from '@/components/TrendingSection';
export default function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Latest News');
    const [searchQuery, setSearchQuery] = useState('');
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        console.log('[v0] Category changed to:', category);
    };
    const handleSearch = (query) => {
        setSearchQuery(query);
        console.log('[v0] Search query:', query);
    };
    return (<div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeCategory={activeCategory} onCategoryChange={handleCategoryChange}/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} activeCategory={activeCategory} onCategoryChange={handleCategoryChange} onSearch={handleSearch}/>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
              {/* Main Feed */}
              <div className="lg:col-span-2">
                <ArticleFeed searchQuery={searchQuery} category={activeCategory}/>
              </div>

              {/* Trending Sidebar */}
              <div className="hidden lg:block">
                <TrendingSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
