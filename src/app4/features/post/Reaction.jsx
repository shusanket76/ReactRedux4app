import { reactionAdded } from "./postSlice";
import { useDispatch } from "react-redux";

const rEmoji = {
  "like": "❤️",
  "dislike": "👎",
};

import React from "react";

const Reaction = ({ post }) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(rEmoji).map(([n, e]) => {
    return (
      <>
        <button
          key={n}
          type="button"
          onClick={() =>
            dispatch(reactionAdded({ postId: post.id, reaction: n }))
          }
        >
          {e}
          {post.reactions[n]}
        </button>
      </>
    );
  });
  return <>{reactionButtons}</>;
};

export default Reaction;
