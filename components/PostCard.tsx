
import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

/**
 * components/PostCard.tsx
 * A high-fidelity reusable component to display individual post data.
 * Enhanced with:
 * - Smooth hover transformations (-translate-y-1)
 * - Deep interactive shadows
 * - Distinct glass-morphism elements
 * - Full text display as requested
 */
export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article 
      className="group bg-white rounded-[2rem] p-6 mb-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] 
                 border border-slate-100 hover:border-blue-200 transition-all duration-300 
                 cursor-pointer active:scale-[0.97] hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(37,99,235,0.12)]
                 relative overflow-hidden"
    >
      {/* Subtle background glow on hover */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-slate-900 group-hover:bg-blue-600 flex items-center justify-center text-white text-[11px] font-black transition-colors duration-300 shadow-lg shadow-slate-200 group-hover:shadow-blue-200">
            {post.id}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Post ID</span>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-green-50 rounded-full">
           <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
           <span className="text-[9px] font-black text-green-600 uppercase">Live</span>
        </div>
      </div>
      
      {/* Title with improved leading and weight */}
      <h2 className="text-lg font-black text-slate-800 mb-3 leading-tight first-letter:uppercase group-hover:text-blue-700 transition-colors relative z-10">
        {post.title}
      </h2>
      
      {/* Body with optimized line height for readability */}
      <p className="text-slate-500 text-[14px] leading-relaxed relative z-10">
        {post.body}
      </p>
      
      <div className="mt-5 pt-5 border-t border-slate-50 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm"
              >
                 <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
              </div>
            ))}
            <div className="w-6 h-6 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center shadow-sm">
               <span className="text-[8px] font-black text-blue-500">+12</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-300">Interactions</span>
        </div>

        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">UID: {post.userId}</span>
        </div>
      </div>

      {/* Interactive indicator bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-blue-600 transition-all duration-500 w-0 group-hover:w-full" />
    </article>
  );
};
