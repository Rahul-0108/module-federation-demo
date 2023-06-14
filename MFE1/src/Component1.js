import React from 'react';
import loadable from "@loadable/component";
const Component2 = loadable(async () => import(/* webpackChunkName: "component2" */ "./Component2"));
function Component1(props) {
  return (
    <div style={{ backgroundColor: "green" }}>{props.text}
      <Component2 />
    </div>
  );
}

export default Component1;
