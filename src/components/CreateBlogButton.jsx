import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { PlusCircle, Loader2 } from 'lucide-react';
const blogSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    category: z.string().min(1, 'At least one category is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    content: z.string().min(50, 'Content must be at least 50 characters'),
    coverImage: z.string().url('Must be a valid URL'),
});
export default function CreateBlogButton() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const form = useForm({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: '',
            category: '',
            description: '',
            content: '',
            coverImage: '',
        },
    });
    const mutation = useMutation({
        mutationFn: (data) => {
            const categories = data.category.split(',').map(c => c.trim().toUpperCase());
            return api.createBlog({
                ...data,
                category: categories,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            toast.success('Blog created successfully!', {
                duration: 4000,
                description: 'Your blog post has been published and is now live.',
                className: 'animate-slideInRight',
                style: {
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                    border: '1px solid #86efac',
                },
                icon: (<div className="animate-bounceIn bg-green-100 rounded-full p-1">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path className="animate-checkmark" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                        </svg>
                    </div>),
            });
            setOpen(false);
            form.reset();
        },
        onError: () => {
            toast.error('Failed to create blog. Please try again.', {
                description: 'There was an error processing your request.',
            });
        },
    });
    const onSubmit = (data) => {
        mutation.mutate(data);
    };
    return (<Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-black hover:bg-gray-800 text-white shadow-professional">
                    <PlusCircle className="w-4 h-4 mr-2"/>
                    Create Blog
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-gray-200 text-gray-900">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-gray-900 font-bold">
                        Create New Blog
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Share your thoughts with the world. Fill in the details below.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="title" render={({ field }) => (<FormItem>
                                    <FormLabel className="text-gray-900 font-medium">Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter blog title" {...field} className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-black"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>)}/>

                        <FormField control={form.control} name="category" render={({ field }) => (<FormItem>
                                    <FormLabel className="text-gray-900 font-medium">Categories</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., TECH, FINANCE (comma-separated)" {...field} className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-black"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>)}/>

                        <FormField control={form.control} name="description" render={({ field }) => (<FormItem>
                                    <FormLabel className="text-gray-900 font-medium">Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Brief description of your blog" {...field} className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-black min-h-20"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>)}/>

                        <FormField control={form.control} name="coverImage" render={({ field }) => (<FormItem>
                                    <FormLabel className="text-gray-900 font-medium">Cover Image URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com/image.jpg" {...field} className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-black"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>)}/>

                        <FormField control={form.control} name="content" render={({ field }) => (<FormItem>
                                    <FormLabel className="text-gray-900 font-medium">Content</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Write your blog content here..." {...field} className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-black min-h-40"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>)}/>

                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={mutation.isPending} className="flex-1 bg-black hover:bg-gray-800 text-white">
                                {mutation.isPending ? (<>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                                        Creating...
                                    </>) : ('Create Blog')}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>);
}
