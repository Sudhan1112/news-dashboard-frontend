import { useState } from 'react';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import CreateBlogButton from './components/CreateBlogButton';
import { Toaster } from '@/components/ui/sonner';
function App() {
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    return (<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white shadow-sm">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            CA Monk Blog
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">Discover amazing stories</p>
                    </div>
                    <CreateBlogButton />
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-180px)]">
                    {/* Left Panel - Blog List */}
                    <div className="overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-professional-lg">
                        <BlogList onSelectBlog={setSelectedBlogId} selectedBlogId={selectedBlogId}/>
                    </div>

                    {/* Right Panel - Blog Detail */}
                    <div className="overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-professional-lg">
                        <BlogDetail blogId={selectedBlogId}/>
                    </div>
                </div>
            </main>

            <Toaster />
        </div>);
}
export default App;
