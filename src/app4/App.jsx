import React from "react";
import PostList from "./features/post/PostList";
import AddForm from "./features/post/AddForm";
import { Routes, Route } from "react-router-dom";
import SinglePost from "./features/post/SinglePost";
import Layout from "./layout/Layout";
import EditPostForm from "./features/post/EditPostForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AddForm />}></Route>
        <Route path="post" element={<Layout />}>
          <Route index element={<PostList />}></Route>
          <Route path=":id" element={<SinglePost />}>
            {" "}
          </Route>
          <Route path="edit/:postId" element={<EditPostForm />}>
            {" "}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
