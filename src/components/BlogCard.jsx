import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
export default function BlogCard({ blog, onClick, isSelected }) {
    return (<Card onClick={onClick} className={cn('p-5 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-gray-200 bg-white', isSelected && 'ring-2 ring-black shadow-lg')}>
            <div className="flex flex-wrap gap-2 mb-3">
                {blog.category.map((cat) => (<Badge key={cat} variant="secondary" className="text-xs bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200">
                        {cat}
                    </Badge>))}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-gray-700 transition-colors">
                {blog.title}
            </h3>

            <p className="text-sm text-gray-600 line-clamp-2">
                {blog.description}
            </p>
        </Card>);
}
