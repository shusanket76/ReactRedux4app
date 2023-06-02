import { useSelector } from "react-redux";
import { useGetPostsQuery } from "./postSliceb ";
import React from "react";
import PostExcerpt from "./PostExcerpt";

const PostList = () => {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();

  let content;

  if (isLoading) {
    content = <p>LOADING....</p>;
  } else if (isSuccess) {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post}></PostExcerpt>
    ));
  } else if (isError) {
    content = <p>{error} </p>;
  }
  return <>{content}</>;
};

export default PostList;
