import React, { lazy, Suspense } from 'react';
import './App.css';

const Component1 = lazy(() => import('MFE5/Component1'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading Component1...</div>}>
        <Component1 text="Text coming from Portal App" />
      </Suspense>
      <div className="container">Other parts of Portal page</div>
    </div>
  );
}

export default App;