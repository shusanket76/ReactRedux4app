import { useSelector } from "react-redux";
import { selectAllPosts } from "./postSlice";
import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import Reaction from "./Reaction";

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const orderedPost = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPost = orderedPost.map((post) => (
    <article key={post.id}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>
        <TimeAgo timestamp={post.date} />
      </p>

      <p>
        <PostAuthor userId={post.userId} />
      </p>
      <p>
        <Reaction post={post}></Reaction>
      </p>
    </article>
  ));
  return <>{renderedPost}</>;
};

export default PostList;
