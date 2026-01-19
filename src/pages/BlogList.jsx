import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import BlogCard from '@/components/BlogCard';
import BlogSkeleton from '@/components/BlogSkeleton';
import ErrorState from '@/components/ErrorState';
import { ScrollArea } from '@/components/ui/scroll-area';
export default function BlogList({ onSelectBlog, selectedBlogId }) {
    const { data: blogs, isLoading, error, refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: api.fetchBlogs,
    });
    if (isLoading) {
        return (<div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">All Blogs</h2>
                {[...Array(3)].map((_, i) => (<BlogSkeleton key={i}/>))}
            </div>);
    }
    if (error) {
        return (<div className="p-6">
                <ErrorState message="Failed to load blogs. Please try again." onRetry={() => refetch()}/>
            </div>);
    }
    return (<div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">All Blogs</h2>
                <p className="text-sm text-gray-600 mt-1">{blogs?.length || 0} articles available</p>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-6 space-y-4">
                    {blogs?.map((blog) => (<BlogCard key={blog.id} blog={blog} onClick={() => onSelectBlog(blog.id)} isSelected={selectedBlogId === blog.id}/>))}
                </div>
            </ScrollArea>
        </div>);
}
