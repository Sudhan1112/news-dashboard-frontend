'use client';
import { Toaster as Sonner } from 'sonner';
const Toaster = ({ ...props }) => {
    return (<Sonner theme="light" position="top-right" expand={true} richColors className="toaster group" toastOptions={{
            classNames: {
                toast: 'group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg animate-slideInRight',
                description: 'group-[.toast]:text-gray-600',
                actionButton: 'group-[.toast]:bg-black group-[.toast]:text-white',
                cancelButton: 'group-[.toast]:bg-gray-100 group-[.toast]:text-gray-700',
                success: 'group-[.toast]:bg-green-50 group-[.toast]:border-green-200 animate-successPulse',
                error: 'group-[.toast]:bg-red-50 group-[.toast]:border-red-200 animate-slideInUp',
            },
        }} {...props}/>);
};
export { Toaster };
