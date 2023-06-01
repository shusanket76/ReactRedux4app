import { useSelector } from "react-redux";
import { selectAllPosts, selectAllStatus, selectAllError } from "./postSlice";
import React from "react";
import PostExcerpt from "./PostExcerpt";

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(selectAllStatus);
  const postsError = useSelector(selectAllError);

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
