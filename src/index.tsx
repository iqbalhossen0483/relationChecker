import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const rootId = document.getElementById("root");
if (rootId) {
  const root = ReactDOM.createRoot(rootId);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
