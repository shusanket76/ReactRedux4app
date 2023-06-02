import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app6/App.jsx";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./app6/features/api/apiSlice.js";
import { extendedApiSlice } from "./app6/features/post/postSlice.js";
import { store } from "./app6/app/store.js";

store.dispatch(extendedApiSlice.endpoints.getPosts().initiate());
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);
