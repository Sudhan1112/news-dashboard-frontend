'use client';
import React from "react";
import { useState } from 'react';
import { SearchIcon, BellIcon, MessageSquareIcon, MenuIcon } from 'lucide-react';
export default function Header({ onMenuClick, activeCategory, onCategoryChange, onSearch }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const categories = ['Latest News', 'Politics', 'Business', 'Sports', 'Tech', 'More'];
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    };
    return (<header className="bg-card border-b border-border sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Menu Button & Tabs */}
          <div className="flex items-center gap-6">
            <button onClick={onMenuClick} className="lg:hidden text-foreground hover:bg-muted p-2 rounded-md transition-colors" aria-label="Toggle menu">
              <MenuIcon className="w-6 h-6"/>
            </button>
            <div className="flex items-center gap-4 border-b border-border">
              {categories.map((category) => (<button key={category} onClick={() => onCategoryChange(category)} className={`text-sm py-4 transition-colors whitespace-nowrap ${activeCategory === category
                ? 'text-primary font-semibold border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'} ${category === 'Tech' || category === 'More' ? 'hidden sm:block' : ''}`}>
                  {category}
                </button>))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-muted rounded-lg px-3 py-2 gap-2 flex-1 sm:flex-none">
              <SearchIcon className="w-4 h-4 text-muted-foreground"/>
              <input type="text" placeholder="Type to search..." value={searchQuery} onChange={handleSearch} className="bg-transparent outline-none text-sm w-full"/>
            </div>
            <button onClick={() => setShowNotifications(!showNotifications)} className="text-foreground hover:bg-muted p-2 rounded-lg transition-colors relative" aria-label="Notifications">
              <BellIcon className="w-5 h-5"/>
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <button onClick={() => setShowMessages(!showMessages)} className="text-foreground hover:bg-muted p-2 rounded-lg transition-colors" aria-label="Messages">
              <MessageSquareIcon className="w-5 h-5"/>
            </button>
          </div>
        </div>
      </div>
    </header>);
}
