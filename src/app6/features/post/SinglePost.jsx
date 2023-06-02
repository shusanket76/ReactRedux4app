import { useSelector } from "react-redux";
import { selectPostById } from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import Reaction from "./Reaction";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import React from "react";
import EditPostForm from "./EditPostForm";

const SinglePost = () => {
  const { id } = useParams();
  const postId = id;

  const post = useSelector((state) => selectPostById(state, postId));

  if (!post) {
    return (
      <>
        <h1>POST NOT FOUND</h1>
      </>
    );
  } else {
    return (
      <>
        <article>
          <Link to={`/post/edit/${post.id}`}>EDIT?</Link>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
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
  }
};

export default SinglePost;
