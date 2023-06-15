import React, { lazy, Suspense } from 'react';
// import { Button } from "@itwin/itwinui-react";
import Component5 from './Component5';
import './App.css';
// import loadable from "@loadable/component";
// const Component5 = loadable(async () => import(/* webpackChunkName: "component5" */ "./Component5"));
const Component1 = lazy(() => import('MFE5/Component1'));

function App() {
  return (
    <div>
      {/* <Button /> */}

      <Suspense fallback={<div>Loading Component1...</div>}>
        <Component1 text="Text coming from Portal App" />
      </Suspense>
      <Component5 />
      <div className="container">Other parts of Portal page</div>
    </div>
  );
}

export default App;