'use client';
import { X, Home, Newspaper, TrendingUp, Briefcase, Zap, Compass, Settings, LogOut } from 'lucide-react';
export default function Sidebar({ open, onClose, activeCategory, onCategoryChange }) {
    const categories = [
        { name: 'Latest News', icon: Home },
        { name: 'Politics', icon: Newspaper },
        { name: 'Business', icon: Briefcase },
        { name: 'Sports', icon: TrendingUp },
        { name: 'Technology', icon: Zap },
        { name: 'Travel', icon: Compass },
    ];
    const handleCategoryClick = (name) => {
        onCategoryChange(name);
        onClose();
    };
    const handleSettings = () => {
        console.log('[v0] Settings clicked');
        onClose();
    };
    const handleLogout = () => {
        console.log('[v0] Logout clicked');
        alert('Logged out successfully!');
        onClose();
    };
    return (<>
      {/* Mobile Overlay */}
      {open && (<div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={onClose}/>)}

      {/* Sidebar */}
      <aside className={`fixed lg:static w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 z-50 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          <h1 className="text-2xl font-bold text-sidebar-foreground">Maise</h1>
          <button onClick={onClose} className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent rounded-md p-1">
            <X className="w-5 h-5"/>
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sidebar-primary flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-semibold">V</span>
            </div>
            <div>
              <p className="font-semibold text-sidebar-foreground text-sm">Vladimir Raksha</p>
              <p className="text-xs text-muted-foreground">Premium Plan</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">Categories</p>
          <div className="space-y-1">
            {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.name;
            return (<button key={category.name} onClick={() => handleCategoryClick(category.name)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}>
                  <Icon className="w-5 h-5"/>
                  <span className="text-sm">{category.name}</span>
                </button>);
        })}
          </div>
        </nav>

        {/* Bottom Menu */}
        <div className="p-4 border-t border-sidebar-border space-y-2">
          <button onClick={handleSettings} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm">
            <Settings className="w-5 h-5"/>
            <span>Settings</span>
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm">
            <LogOut className="w-5 h-5"/>
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>);
}
