import React from 'react';

export const LiveAssistant: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 bg-white p-4 rounded-full shadow-lg flex items-center space-x-3">
      <div className="relative flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
        <div className="absolute w-full h-full bg-blue-500 rounded-full animate-ping" />
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.746A9.953 9.953 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-bold text-slate-800">Live Assistant</p>
        <p className="text-xs text-green-600 font-bold">Online</p>
      </div>
    </div>
  );
};