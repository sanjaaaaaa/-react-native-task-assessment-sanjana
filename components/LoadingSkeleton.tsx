
import React from 'react';

/**
 * components/LoadingSkeleton.tsx
 * A high-fidelity skeleton screen that mimics the PostCard structure.
 * This provides a smoother transition and better UX than a generic spinner.
 */
export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4">
      {[...Array(6)].map((_, i) => (
        <div 
          key={i} 
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
          style={{ opacity: 1 - (i * 0.15) }} // Subtle fade out effect for lower items
        >
          {/* Header row: ID badge and dot placeholder */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-7 h-7 rounded-lg bg-slate-100" />
            <div className="h-1.5 w-1.5 rounded-full bg-slate-100" />
          </div>
          
          {/* Title placeholder */}
          <div className="h-5 bg-slate-100 rounded-md w-3/4 mb-3" />
          
          {/* Body placeholders */}
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-slate-50 rounded w-full" />
            <div className="h-3 bg-slate-50 rounded w-full" />
            <div className="h-3 bg-slate-50 rounded w-4/5" />
          </div>
          
          {/* Footer placeholders: Avatars and Author label */}
          <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
            <div className="flex -space-x-1">
              {[1, 2, 3, 4].map(j => (
                <div key={j} className="w-5 h-5 rounded-full border border-white bg-slate-50" />
              ))}
            </div>
            <div className="h-2 bg-slate-50 rounded w-16" />
          </div>
        </div>
      ))}
    </div>
  );
};
