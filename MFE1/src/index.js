import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Component1 from "./Component1";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(<Component1 text="MFE1"></Component1>, document.getElementById("app"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();