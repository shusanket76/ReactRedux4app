import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import Reaction from "./Reaction";

const PostExcerpt = ({ post }) => {
  return (
    <>
      <article>
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
    </>
  );
};

export default PostExcerpt;
