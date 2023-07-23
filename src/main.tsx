import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../ui/reset.css";
import "../ui/global.css";
import "../ui/token-append.css";
import "../ui/utility.css";
import "../ui/utility-append.css";
import "../ui/recipes.css";
import "../ui/keyframes.css";
import "../ui/binding/index.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
