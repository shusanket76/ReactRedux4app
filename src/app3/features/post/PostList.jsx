import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  selectAllStatus,
  selectAllError,
  fetchPosts,
} from "./postSlice";
import React from "react";
import PostExcerpt from "./PostExcerpt";
import { useEffect } from "react";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(selectAllStatus);
  const postsError = useSelector(selectAllError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "loading") {
    content = <p>LOADING....</p>;
  } else if (postsStatus === "succeeded") {
    content = posts.map((post) => (
      <PostExcerpt key={post.id} post={post}></PostExcerpt>
    ));
  } else if (postsStatus === "error") {
    content = <p>ERROR </p>;
  }
  return <>{content}</>;
};

export default PostList;
