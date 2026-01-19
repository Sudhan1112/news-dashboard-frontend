const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
export const api = {
    async fetchBlogs() {
        const response = await fetch(`${API_URL}/blogs`);
        if (!response.ok) {
            throw new Error('Failed to fetch blogs');
        }
        return response.json();
    },
    async fetchBlogById(id) {
        const response = await fetch(`${API_URL}/blogs/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch blog');
        }
        return response.json();
    },
    async createBlog(data) {
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
        return response.json();
    },
};
