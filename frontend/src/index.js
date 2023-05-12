import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import { AuthProvider } from "./auth/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ProSidebarProvider>
          <App />
        </ProSidebarProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
