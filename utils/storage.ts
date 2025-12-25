const SEARCH_HISTORY_KEY= '@post_explorer_search_query';

export const storage = {
  saveSearchQuery: async (query: string): Promise<void> => {
    try {
      localStorage.setItem(SEARCH_HISTORY_KEY, query);
    } catch (error) {
      console.error('Error saving search to storage:', error);
    }
  },
  getSearchQuery: async (): Promise<string> => {
    try {
      const value = localStorage.getItem(SEARCH_HISTORY_KEY);
      return value || '';
    } catch (error) {
      console.error('Error retrieving search from storage:', error);
      return '';
    }
  },
  clearSearchHistory: async (): Promise<void> => {
    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing search storage:', error);
    }
  }
};
