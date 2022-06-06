import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <ScrollToTop />
    <App />
    {/* </React.StrictMode> */}
  </BrowserRouter>
);
