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
import { useRef } from "react";
import { Link } from "react-router-dom";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(selectAllStatus);
  const postsError = useSelector(selectAllError);
  const sref = useRef(false);

  useEffect(() => {
    if (sref.current === false) {
      if (postsStatus === "idle") {
        dispatch(fetchPosts());
      }
    }
    return () => {
      sref.current = true;
    };
  }, [postsStatus, dispatch]);

  let content;

  if (postsStatus === "loading") {
    content = <p>LOADING....</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post}></PostExcerpt>
    ));
  } else if (postsStatus === "error") {
    content = <p>ERROR </p>;
  }
  return <>{content}</>;
};

export default PostList;
