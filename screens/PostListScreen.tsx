
import React from 'react';
import { usePosts } from '../hooks/usePosts';
import { PostCard } from '../components/PostCard';
import { SearchBar } from '../components/SearchBar';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { LiveAssistant } from '../components/LiveAssistant';
import { FetchStatus, Post } from '../types';

/**
 * Renders the main screen of the application, which displays a list of posts.
 * It uses the `usePosts` hook to fetch and manage the post data.
 *
 * Features:
 * - Displays a loading skeleton while posts are being fetched.
 * - Shows an error message if the posts fail to load.
 * - Allows users to search for posts.
 * - Displays a message when no posts match the search query.
 * - Provides a button to refresh the posts.
 */
export const PostListScreen: React.FC = () => {
  const { 
    posts, 
    status, 
    searchQuery, 
    setSearchQuery, 
    isRefreshing, 
    refresh 
  } = usePosts();

  /**
   * Renders the main content of the screen based on the current fetch status.
   */
  const renderContent = () => {
    // When the app is first loading, show a skeleton screen.
    if (status === FetchStatus.LOADING && !isRefreshing) {
      return (
        <div className="px-5 py-6">
          <LoadingSkeleton />
        </div>
      );
    }

    // If there was a network error, display an error message.
    if (status === FetchStatus.ERROR) {
      return (
        <div className="flex flex-col items-center justify-center p-10 text-center animate-in fade-in duration-500 min-h-[50vh]">
          <div className="w-20 h-20 bg-red-50 rounded-[2.5rem] flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-3">Network Error</h2>
          <p className="text-slate-500 text-sm max-w-[260px] mb-8 leading-relaxed">
            Unable to fetch posts. Check your network connection.
          </p>
          <button 
            onClick={() => refresh()}
            className="px-10 py-3.5 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:bg-black active:scale-95 transition-all text-sm tracking-tight"
          >
            Retry Connection
          </button>
        </div>
      );
    }

    // If there are no posts that match the search query, show a message.
    if (posts.length === 0 && status === FetchStatus.SUCCESS) {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center animate-in zoom-in-95 duration-500 min-h-[50vh]">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-200">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-slate-900 font-black text-xl mb-2 tracking-tight">No matches found</p>
          <p className="text-slate-400 text-sm max-w-[220px] leading-relaxed">
            We couldn't find any posts matching <span className="text-blue-600 font-bold">"{searchQuery}"</span>.
          </p>
        </div>
      );
    }

    // Otherwise, display the list of posts.
    return (
      <div className="px-5 pb-24 pt-4">
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc]">
      {/* Header */}
      <header className="px-6 pt-12 pb-5 bg-white/80 backdrop-blur-xl flex items-end justify-between border-b border-slate-100 sticky top-0 z-40">
        <div className="flex flex-col">
          <div className="flex items-baseline mb-0.5">
             <h1 className="text-3xl tracking-tight leading-none">
                <span className="font-black text-slate-900">exact</span>
                <span className="font-semibold text-blue-600">space</span>
             </h1>
             <span className="ml-1 w-2 h-2 rounded-full bg-blue-500" />
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">
            Data Insights & Exploration
          </p>
        </div>
        <button 
          onClick={() => refresh()}
          disabled={isRefreshing}
          className={`mb-1 p-3 rounded-2xl bg-slate-50 text-slate-900 hover:bg-blue-600 hover:text-white transition-all shadow-sm ${isRefreshing ? 'animate-spin opacity-50' : 'active:scale-90'}`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </header>

      {/* Search Bar */}
      <SearchBar 
        value={searchQuery} 
        onChange={setSearchQuery} 
        resultsCount={posts.length} 
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {isRefreshing && (
          <div className="flex justify-center items-center py-4 sticky top-0 z-30">
             <div className="flex items-center space-x-3 px-5 py-2.5 bg-slate-900 rounded-full shadow-xl">
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Refreshing Feed</span>
             </div>
          </div>
        )}
        {renderContent()}
      </main>

      <LiveAssistant />
    </div>
  );
};
