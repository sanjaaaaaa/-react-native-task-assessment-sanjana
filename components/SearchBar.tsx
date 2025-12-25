
import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
  resultsCount?: number;
}

/**
 * components/SearchBar.tsx
 * A high-performance search input component.
 * Features:
 * - Real-time feedback via onChange
 * - Case-insensitive filtering support (handled in hook)
 * - Clear button for better UX
 * - No search button required (instant filtering)
 */
export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, resultsCount }) => {
  return (
    <div className="px-4 py-3 bg-white border-b border-slate-100 shadow-sm sticky top-0 z-20">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            className={`h-4 w-4 transition-colors duration-200 ${value ? 'text-blue-500' : 'text-slate-400'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-10 pr-12 py-2.5 border border-slate-200 rounded-2xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-medium shadow-inner"
          placeholder="Search post titles..."
          aria-label="Search posts"
        />

        {value && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-2">
            <button 
              onClick={() => onChange('')}
              className="p-1 rounded-full text-slate-300 hover:text-slate-500 active:scale-90 transition-all"
              title="Clear search"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {/* Subtle results indicator */}
      {value && typeof resultsCount === 'number' && (
        <div className="mt-2 px-1 flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {resultsCount} {resultsCount === 1 ? 'Result' : 'Results'} found
          </span>
          <span className="text-[10px] text-blue-500 font-bold animate-pulse">Filtering Live</span>
        </div>
      )}
    </div>
  );
};
