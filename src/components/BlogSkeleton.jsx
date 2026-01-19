import { Card } from '@/components/ui/card';
export default function BlogSkeleton({ variant = 'card' }) {
    if (variant === 'detail') {
        return (<div className="animate-pulse space-y-4">
                <div className="h-64 bg-gray-200 rounded-xl"/>
                <div className="flex gap-2">
                    <div className="h-6 w-20 bg-gray-200 rounded-full"/>
                    <div className="h-6 w-20 bg-gray-200 rounded-full"/>
                </div>
                <div className="h-8 bg-gray-200 rounded w-3/4"/>
                <div className="h-4 bg-gray-200 rounded w-1/4"/>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"/>
                    <div className="h-4 bg-gray-200 rounded"/>
                    <div className="h-4 bg-gray-200 rounded w-5/6"/>
                </div>
            </div>);
    }
    return (<Card className="p-5 border-gray-200 bg-white">
            <div className="animate-pulse space-y-3">
                <div className="flex gap-2">
                    <div className="h-5 w-16 bg-gray-200 rounded-full"/>
                    <div className="h-5 w-16 bg-gray-200 rounded-full"/>
                </div>
                <div className="h-6 bg-gray-200 rounded w-3/4"/>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"/>
                    <div className="h-4 bg-gray-200 rounded w-5/6"/>
                </div>
            </div>
        </Card>);
}
