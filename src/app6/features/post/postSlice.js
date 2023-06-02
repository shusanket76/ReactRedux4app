import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { apiSlice } from "../api/apiSlice";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompate(a.date),
});
const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformResponse: (shusanketResponseData) => {
        let min = 1;
        const loadedPosts = shusanketResponseData.map((post) => {
          if (!post?.date) post.date = sub(new Date(), { minutes: min++ });
          if (!post?.reactions)
            post.reactions = {
              like: 0,
              dislike: 0,
            };
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => [
        { type: "PostHoLanthu", id: "LIST" },
        ...result.ids.map((id) => ({ type: "PostHoLanthu", id })),
      ],
    }),
    getPostByUserId: builder.query({
      query: (id) => `/post/${id}`,
      transformResponse: (shusanketResponseData) => {
        let min = 1;
        const loadedPosts = shusanketResponseData.map((post) => {
          if (!post?.date) {
            post.date = sub(new Date(), { minutes: min++ });
          }
          if (!post?.reactions) {
            post.reactions = {
              like: 0,
              dislike: 0,
            };
          }
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => {
        return [...result.ids.map((id) => ({ type: "PostHoLanthu", id }))];
      },
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...initialPost,
          userId: Number(initialPost.userId),
          date: new Date().toISOString(),
          reactions: {
            like: 0,
            dislike: 0,
          },
        },
      }),
      invalidatesTags: [{ type: "PostHoLanthu", id: "LIST" }],
    }),
    updatePost: builder.mutation({
      query: (initialPost) => ({
        url: `/posts/${initialPost.id}`,
        method: "PUT",
        body: {
          ...initialPost,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "PostHoLanthu", id: arg.id },
      ],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "PostHoLanthu", id: arg.id },
      ],
    }),
  }),
});
export const {
  useGetPostsQuery,
  useGetPostByUserIdQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = extendedApiSlice;
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors(
  (state) => selectPostsData(state) ?? initialState
);
