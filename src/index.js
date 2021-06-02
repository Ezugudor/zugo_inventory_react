import { Provider as StoreBinder } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import "../src/styles/index.css";
import Store from "./store";
import React from "react";
import App from "./App";

ReactDOM.render(
  <StoreBinder store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreBinder>,
  document.getElementById("root")
);
