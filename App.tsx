
import React from 'react';
import { PostListScreen } from './screens/PostListScreen';

/**
 * App.tsx
 * Root component for the Intern Assessment Project.
 */
function App() {
  return (
    <div className="app-container">
      <div className="app-mock bg-white overflow-hidden relative w-full h-full sm:max-h-[844px] sm:max-w-[390px]">
        <PostListScreen />
      </div>
    </div>
  );
}

export default App;
