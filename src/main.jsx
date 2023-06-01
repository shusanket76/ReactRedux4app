import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app5/App.jsx";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./app5/features/api/apiSlice.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);
