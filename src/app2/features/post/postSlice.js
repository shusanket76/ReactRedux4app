import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: "1",
    title: "Learning redux toolkit",
    content: "Easy",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      like: 0,
      dislike: 0,
    },
  },
  {
    id: "2",
    title: "Learning BY HEART toolkit",
    content: "MEDIUM",
    date: sub(new Date(), { hours: 1 }).toISOString(),
    reactions: {
      like: 0,
      dislike: 0,
    },
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        // state.push(action.payload);
        return [...state, action.payload];
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              like: 0,
              dislike: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});
export const selectAllPosts = (state) => state.shusanket;

export default postSlice.reducer;

export const { postAdded, reactionAdded } = postSlice.actions;
