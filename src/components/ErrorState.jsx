import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
export default function ErrorState({ message, onRetry }) {
    return (<div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600"/>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
            <p className="text-gray-600 mb-6 max-w-md">{message}</p>
            <Button onClick={onRetry} className="bg-black hover:bg-gray-800 text-white">
                Try Again
            </Button>
        </div>);
}
