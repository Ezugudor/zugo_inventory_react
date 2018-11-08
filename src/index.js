import { Provider as StoreBinder } from "react-redux";
import ReactDOM from "react-dom";
import "../src/styles/index.css";
import Store from "./store";
import React from "react";
import App from "./App";

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <StoreBinder store={Store}>
    <App />
  </StoreBinder>,
  document.getElementById("root")
);
registerServiceWorker();
