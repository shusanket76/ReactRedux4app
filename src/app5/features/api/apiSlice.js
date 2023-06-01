import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: " http://localhost:4000" }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
    }),
    addTodos: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      updateTodo: builder.mutation({
        query: (todo) => ({
          url: `/todos/${todo.id}`,
          method: "PATCH",
          body: todo,
        }),
      }),
    }),
  }),
});

export const { useGetTodosQuery, useAddTodosMutation } = apiSlice;
