import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async"; 
import "./index.scss";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <HelmetProvider> 
    <App />
  </HelmetProvider>
);
