
/**
 * utils/storage.ts
 * Helper for persistence logic.
 * 
 * DESIGN CHOICE: This simulates @react-native-async-storage/async-storage 
 * using localStorage for the browser environment. In a real React Native 
 * environment, the imports and calls would be identical in spirit.
 */

const SEARCH_HISTORY_KEY = '@post_explorer_search_query';

export const storage = {
  /**
   * Persists the search text to storage.
   * Called whenever the user types to ensure history is kept.
   */
  saveSearchQuery: async (query: string): Promise<void> => {
    try {
      // Simulate async nature of AsyncStorage
      return new Promise((resolve) => {
        localStorage.setItem(SEARCH_HISTORY_KEY, query);
        resolve();
      });
    } catch (error) {
      console.error('Error saving search to storage:', error);
    }
  },

  /**
   * Retrieves the persisted search text.
   * Used on app startup to restore the user's last state.
   */
  getSearchQuery: async (): Promise<string> => {
    try {
      return new Promise((resolve) => {
        const value = localStorage.getItem(SEARCH_HISTORY_KEY);
        resolve(value !== null ? value : '');
      });
    } catch (error) {
      console.error('Error retrieving search from storage:', error);
      return '';
    }
  },

  /**
   * Optional helper to clear history.
   */
  clearSearchHistory: async (): Promise<void> => {
    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing search storage:', error);
    }
  }
};
