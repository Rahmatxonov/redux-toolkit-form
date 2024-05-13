import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  tagTypes: [`todos`],
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),

  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => ({
        url: `todos`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "todos", id })),
              { type: "todos", id: "LIST" },
            ]
          : [{ type: "todos", id: "LIST" }],
    }),
    addTodos: builder.mutation({
      query: (body) => ({
        url: "todos",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "todos" }],
    }),
    deleteTodos: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "todos" }],
    }),
    updateTodos: builder.mutation({
      query: ({ body }) => ({
        url: `todos/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "todos" }],
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useAddTodosMutation,
  useDeleteTodosMutation,
  useUpdateTodosMutation,
} = todosApi;
