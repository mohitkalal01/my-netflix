import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext"; // Import ProfileProvider
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ProfileProvider> {/* Wrap App with ProfileProvider */}
        <App />
      </ProfileProvider>
    </AuthProvider>
  </BrowserRouter>
);


