import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);

  return response.data;
});
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
  }
);
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`${POSTS_URL}/${id}`);
      if (response?.status === 200) return initialPost;
      return `${response?.status}:${response?.statusText}`;
    } catch (error) {
      return error.message;
    }
  }
);
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
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
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      let min = 1;
      const loadedPosts = action.payload.map((post) => {
        post.date = sub(new Date(), {
          minutes: min++,
        }).toISOString();
        post.reactions = {
          like: 0,
          dislike: 0,
        };
        return post;
      });
      state.posts = state.posts.concat(loadedPosts);
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      action.payload.userId = Number(action.payload.userId);
      action.payload.date = new Date().toISOString();
      action.payload.reactions = {
        like: 0,
        dislike: 0,
      };

      state.posts.push(action.payload);
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      if (!action.payload?.id) {
        console.log("UPDATE ERROR");
        return;
      }
      const { id } = action.payload;
      action.payload.date = new Date().toISOString();
      const posts = state.posts.filter(
        (post) => Number(post.id) !== Number(id)
      );
      state.posts = [...posts, action.payload];
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      if (!action.payload?.id) {
        return;
      }
      const { id } = action.payload;
      const posts = state.posts.filter((post) => post.id !== id);
      state.posts = posts;
    });
  },
});
export const selectAllPosts = (state) => state.shusanket.posts;
export const selectAllStatus = (state) => state.shusanket.status;
export const selectAllError = (state) => state.shusanket.error;
export const selectPostById = (state, postId) => {
  return state.shusanket.posts.find(
    (post) => Number(post.id) === Number(postId)
  );
};

export default postSlice.reducer;

export const { postAdded, reactionAdded } = postSlice.actions;
