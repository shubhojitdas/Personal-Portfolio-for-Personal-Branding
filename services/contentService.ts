import { Post, INITIAL_POSTS } from '../types';

const STORAGE_KEY = 'holistic_cms_posts';
const AUTH_KEY = 'holistic_cms_auth';

// Initialize storage if empty
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
}

export const ContentService = {
  getAllPosts: (): Post[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to load posts", e);
      return [];
    }
  },

  getPostBySlug: (slug: string): Post | undefined => {
    const posts = ContentService.getAllPosts();
    return posts.find(p => p.slug === slug);
  },
  
  getPostById: (id: string): Post | undefined => {
    const posts = ContentService.getAllPosts();
    return posts.find(p => p.id === id);
  },

  savePost: (post: Post): void => {
    const posts = ContentService.getAllPosts();
    const existingIndex = posts.findIndex(p => p.id === post.id);
    
    if (existingIndex >= 0) {
      posts[existingIndex] = { ...post, updatedAt: new Date().toISOString() };
    } else {
      posts.unshift({ 
        ...post, 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString() 
      });
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  },

  deletePost: (id: string): void => {
    const posts = ContentService.getAllPosts();
    const filtered = posts.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  },

  login: (password: string): boolean => {
    // Simple mock auth
    if (password === 'admin') {
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  },

  logout: (): void => {
    localStorage.removeItem(AUTH_KEY);
  }
};