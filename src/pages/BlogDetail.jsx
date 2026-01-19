import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { format } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import BlogSkeleton from '@/components/BlogSkeleton';
import ErrorState from '@/components/ErrorState';
import { Calendar } from 'lucide-react';
export default function BlogDetail({ blogId }) {
    const { data: blog, isLoading, error, refetch } = useQuery({
        queryKey: ['blog', blogId],
        queryFn: () => api.fetchBlogById(blogId),
        enabled: !!blogId,
    });
    if (!blogId) {
        return (<div className="h-full flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Blog</h3>
                    <p className="text-gray-600">Choose a blog from the list to view its details</p>
                </div>
            </div>);
    }
    if (isLoading) {
        return (<div className="p-6">
                <BlogSkeleton variant="detail"/>
            </div>);
    }
    if (error || !blog) {
        return (<div className="p-6">
                <ErrorState message="Failed to load blog details. Please try again." onRetry={() => refetch()}/>
            </div>);
    }
    return (<ScrollArea className="h-full">
            <div className="p-6">
                {/* Cover Image */}
                <div className="relative h-64 rounded-xl overflow-hidden mb-6 group">
                    <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"/>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {blog.category.map((cat) => (<Badge key={cat} variant="secondary" className="bg-gray-100 text-gray-700 border-gray-300">
                            {cat}
                        </Badge>))}
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {blog.title}
                </h1>

                {/* Date */}
                <div className="flex items-center gap-2 text-gray-600 mb-6">
                    <Calendar className="w-4 h-4"/>
                    <time>{format(new Date(blog.date), 'MMMM dd, yyyy')}</time>
                </div>

                {/* Description */}
                <p className="text-lg text-gray-700 mb-6 italic border-l-4 border-black pl-4">
                    {blog.description}
                </p>

                {/* Content */}
                <div className="prose prose-gray max-w-none">
                    {blog.content.split('\n\n').map((paragraph, index) => (<p key={index} className="text-gray-700 mb-4 leading-relaxed">
                            {paragraph}
                        </p>))}
                </div>
            </div>
        </ScrollArea>);
}
