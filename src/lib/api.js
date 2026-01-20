import { mockBlogs } from './mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = {
    // Fetch all blogs
    async fetchBlogs() {
        try {
            // Try to fetch from the API first
            const response = await fetch(`${API_URL}/blogs`);
            if (!response.ok) {
                throw new Error('API request failed');
            }
            return await response.json();
        } catch (error) {
            // Fallback to mock data if API is unreachable (e.g., on Vercel)
            console.warn('Backend API not available. Using local mock data.', error);
            // Simulate network delay for realism
            await new Promise(resolve => setTimeout(resolve, 500));
            return mockBlogs;
        }
    },

    // Fetch a single blog by ID
    async fetchBlogById(id) {
        try {
            const response = await fetch(`${API_URL}/blogs/${id}`);
            if (!response.ok) {
                throw new Error('API request failed');
            }
            return await response.json();
        } catch (error) {
            console.warn('Backend API not available. Using local mock data.', error);
            await new Promise(resolve => setTimeout(resolve, 500));
            // Use loose equality (==) to match string IDs with number IDs
            return mockBlogs.find((blog) => blog.id == id);
        }
    },

    // Create a new blog
    async createBlog(data) {
        try {
            const response = await fetch(`${API_URL}/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    date: new Date().toISOString(),
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to create blog');
            }
            return await response.json();
        } catch (error) {
            console.warn('Backend API not available. Simulating blog creation.', error);
            await new Promise(resolve => setTimeout(resolve, 800));
            // Return a simulated success response
            return {
                ...data,
                id: Date.now(),
                date: new Date().toISOString(),
            };
        }
    },
};
