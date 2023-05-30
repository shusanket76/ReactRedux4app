import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    shusanket: postReducer,
    basyal: usersReducer,
  },
});
