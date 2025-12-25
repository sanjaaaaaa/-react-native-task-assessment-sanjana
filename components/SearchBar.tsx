import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
  resultsCount?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, resultsCount }) => {
  return (
    <div className="px-4 py-3 bg-white border-b border-slate-100 shadow-sm sticky top-[90px] z-30">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg 
            className={`h-4 w-4 transition-colors duration-200 ${value ? 'text-blue-600' : 'text-slate-400'}`} 
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
          className="block w-full pl-11 pr-12 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-semibold"
          placeholder="Search posts by title or content..."
          aria-label="Search posts"
        />

        {value && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button 
              onClick={() => onChange('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 active:scale-90 transition-all"
              title="Clear search"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {value && typeof resultsCount === 'number' && (
        <div className="mt-2 px-2 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {resultsCount} {resultsCount === 1 ? 'Result' : 'Results'}
          </span>
        </div>
      )}
    </div>
  );
};
