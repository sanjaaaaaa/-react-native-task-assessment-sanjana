import { useState, useEffect, useMemo, useCallback } from 'react';
import { Post, FetchStatus } from '../types';
import { postService } from '../services/postService';
import { storage } from '../utils/storage';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        const persistedQuery = await storage.getSearchQuery();
        if (persistedQuery) {
          setSearchQuery(persistedQuery);
        }
      } catch (error) { 
        console.error("Failed to load search query:", error);
      }
      
      loadPosts();
    };

    initialize();
  }, []); 
  const loadPosts = useCallback(async (refreshing = false) => {
    if (refreshing) {
      setIsRefreshing(true);
    } else {
      setStatus(FetchStatus.LOADING);
    }

    try {
      const data = await postService.fetchPosts();
      setPosts(data);
      setStatus(FetchStatus.SUCCESS);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setStatus(FetchStatus.ERROR);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    storage.saveSearchQuery(searchQuery);
  }, [searchQuery]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return posts;
    
    return posts.filter(post => 
      post.title.toLowerCase().includes(normalizedQuery) ||
      post.body.toLowerCase().includes(normalizedQuery)
    );
  }, [posts, searchQuery]);

  return {
    posts: filteredPosts,
    status,
    searchQuery,
    setSearchQuery,
    isRefreshing,
    refresh: () => loadPosts(true),
  };
};
