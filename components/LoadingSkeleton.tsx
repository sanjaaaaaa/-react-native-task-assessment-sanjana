import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-5">
      {[...Array(6)].map((_, i) => (
        <div 
          key={i} 
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
          style={{ opacity: 1 - (i * 0.1) }} 
        >
          <div className="flex items-center justify-between mb-5">
            <div className="w-8 h-8 rounded-xl bg-slate-100" />
            <div className="flex items-center space-x-1.5">
              <div className="h-2 w-2 rounded-full bg-slate-100" />
              <div className="h-3 w-10 rounded-md bg-slate-100" />
            </div>
          </div>
          
          <div className="h-5 bg-slate-100 rounded-md w-3/4 mb-4" />
          
          <div className="space-y-2.5">
            <div className="h-3 bg-slate-100 rounded-md w-full" />
            <div className="h-3 bg-slate-100 rounded-md w-full" />
            <div className="h-3 bg-slate-100 rounded-md w-5/6" />
          </div>
          
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(j => (
                  <div key={j} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100" />
                ))}
              </div>
              <div className="h-3 w-16 bg-slate-100 rounded-md" />
            </div>
            <div className="h-3 w-20 bg-slate-100 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};
