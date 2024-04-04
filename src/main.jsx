import React from "react";
import ReactDOM from "react-dom/client";
import CryptoContext from "./Contexts/CryptoContext.jsx";
import "react-alice-carousel/lib/alice-carousel.css";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <CryptoContext>
      <App />
    </CryptoContext>
);
