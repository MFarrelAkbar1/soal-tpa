import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import App from "./App";
import { PenyediaTema } from "./components/TemaToggle";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PenyediaTema>
      <App />
    </PenyediaTema>
  </StrictMode>,
);
