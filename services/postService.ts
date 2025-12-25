import { Post } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const postService = {
  fetchPosts: async (): Promise<Post[]> => {
    try{
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
    }catch (error) {
      console.error('API Fetch Error:', error);
      throw error;
    }
  }
};
