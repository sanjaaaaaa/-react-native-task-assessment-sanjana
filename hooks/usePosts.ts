
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Post, FetchStatus } from '../types';
import { postService } from '../services/postService';
import { storage } from '../utils/storage';

/**
 * hooks/usePosts.ts
 * Main business logic hook for the Post Explorer.
 * Satisfies requirements for fetching, real-time filtering, and AsyncStorage persistence.
 */
export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * REQUIREMENT: PERSISTENCE - RETRIEVE ON RESTART
   * Retrieve saved search text from AsyncStorage on mount.
   * This auto-fills the search input via state.
   */
  useEffect(() => {
    const initializeSearch = async () => {
      const persistedQuery = await storage.getSearchQuery();
      if (persistedQuery) {
        setSearchQuery(persistedQuery);
      }
    };
    initializeSearch();
  }, []);

  /**
   * REQUIREMENT: FETCH & DISPLAY POSTS
   * Functional component logic for data fetching.
   */
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
      setStatus(FetchStatus.ERROR);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  /**
   * REQUIREMENT: PERSISTENCE - SAVE ON TYPE
   * Save the search text to AsyncStorage whenever it changes.
   */
  useEffect(() => {
    storage.saveSearchQuery(searchQuery);
  }, [searchQuery]);

  /**
   * REQUIREMENT: REAL-TIME SEARCH & AUTO-FILTERING
   * Filters posts instantly as the user types or when a value is restored from storage.
   */
  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return posts;
    
    return posts.filter(post => 
      post.title.toLowerCase().includes(normalizedQuery)
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
