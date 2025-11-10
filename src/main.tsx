
  import React from "react";
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "bootstrap/dist/css/bootstrap.min.css";
  import "./index.css";

  // Global function to replace btn-primary with btn-primarys and btn-outline-primary with btn-outline-primarys
  const replaceBtnPrimary = () => {
    // Replace btn-primary with btn-primarys
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach((button) => {
      if (!button.classList.contains('btn-primarys')) {
        button.classList.remove('btn-primary');
        button.classList.add('btn-primarys');
      }
    });
    
    // Replace btn-outline-primary with btn-outline-primarys
    const outlineButtons = document.querySelectorAll('.btn-outline-primary');
    outlineButtons.forEach((button) => {
      if (!button.classList.contains('btn-outline-primarys')) {
        button.classList.remove('btn-outline-primary');
        button.classList.add('btn-outline-primarys');
      }
    });
  };

  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);

  // Run after initial render
  setTimeout(() => {
    replaceBtnPrimary();
    
    // Watch for dynamically added buttons
    const observer = new MutationObserver(() => {
      replaceBtnPrimary();
    });

    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
      });
    }
  }, 0);
  