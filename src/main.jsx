import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app4/App.jsx";
import { store } from "./app4/app/store.js";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchPosts } from "./app4/features/post/postSlice.js";

store.dispatch(fetchPosts());
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
