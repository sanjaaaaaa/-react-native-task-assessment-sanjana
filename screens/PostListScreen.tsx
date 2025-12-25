
import React, { useRef, useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import { PostCard } from '../components/PostCard';
import { SearchBar } from '../components/SearchBar';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { FetchStatus } from '../types';

/**
 * screens/PostListScreen.tsx
 * High-performance Post Explorer for exactspace.
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

  const containerRef = useRef<HTMLDivElement>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const startY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0 && !isRefreshing) {
      startY.current = e.touches[0].pageY;
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling) return;
    const currentY = e.touches[0].pageY;
    const diff = currentY - startY.current;
    
    if (diff > 0) {
      if (e.cancelable) e.preventDefault();
      setPullDistance(Math.min(diff / 2.5, 100));
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance > 65) {
      refresh();
    }
    setIsPulling(false);
    setPullDistance(0);
  };

  const renderContent = () => {
    if (status === FetchStatus.LOADING && !isRefreshing) {
      return (
        <div className="px-5 py-6">
          <LoadingSkeleton />
        </div>
      );
    }

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

    return (
      <div className="px-5 pb-24 pt-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] select-none relative">
      <header className="px-6 pt-12 pb-5 bg-white/80 backdrop-blur-xl flex items-end justify-between border-b border-slate-100 sticky top-0 z-40">
        <div className="flex flex-col">
          {/* Refined 'exactspace' Branding */}
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

      <SearchBar 
        value={searchQuery} 
        onChange={setSearchQuery} 
        resultsCount={posts.length} 
      />

      <main 
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex-1 overflow-y-auto hide-scrollbar scroll-smooth relative"
      >
        <div 
          className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none transition-transform duration-200"
          style={{ 
            transform: `translateY(${pullDistance}px)`,
            opacity: pullDistance / 65,
            height: '0px',
            overflow: 'visible'
          }}
        >
          <div className="flex flex-col items-center -translate-y-full mb-4">
             <div className={`p-2 bg-white rounded-full shadow-lg border border-slate-100 transition-transform ${pullDistance > 65 ? 'scale-110 rotate-180' : 'scale-100'}`}>
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
             </div>
             <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest mt-2 bg-white px-2 py-0.5 rounded-full shadow-sm border border-slate-50">
               {pullDistance > 65 ? 'Release' : 'Pull'}
             </span>
          </div>
        </div>

        {isRefreshing && (
          <div className="flex justify-center items-center py-4 sticky top-0 z-30">
             <div className="flex items-center space-x-3 px-5 py-2.5 bg-slate-900 rounded-full shadow-xl">
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Refreshing Feed</span>
             </div>
          </div>
        )}
        
        <div style={{ transform: pullDistance > 0 ? `translateY(${pullDistance}px)` : 'none' }} className="transition-transform duration-75">
          {renderContent()}
        </div>
      </main>
      
      <footer className="h-20 bg-white/90 backdrop-blur-xl border-t border-slate-100 flex items-center justify-around px-8 z-40 shrink-0 pb-4">
        <button className="flex flex-col items-center text-blue-600 relative">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <div className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-1" />
        </button>
        <button className="flex flex-col items-center text-slate-300 hover:text-slate-400 transition-colors">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
        <button className="flex flex-col items-center text-slate-300 hover:text-slate-400 transition-colors">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          </svg>
        </button>
      </footer>
    </div>
  );
};
