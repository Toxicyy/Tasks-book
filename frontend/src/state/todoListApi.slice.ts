import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo, TodoState } from "../types/todoState";

export const todoListApiSlice = createApi({
  reducerPath: "todoListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders(headers) {
        const token = localStorage.getItem("token");
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      getTodos: builder.query<TodoState, void>({
        query: () => "/todos",
      }),
      addTodo: builder.mutation<Todo, Omit<Todo, "id">>({
        query: (todo) => ({
          url: "/todos",
          method: "POST",
          body: todo,
        }),
      }),
      editTodo: builder.mutation<Todo, Todo>({
        query: (todo) => ({
          url: `/todos/${todo.id}`,
          method: "PUT",
          body: todo,
        }),
      }),
      deleteTodo: builder.mutation<Todo, number>({
        query: (id) => ({
          url: `/todos/${id}`,
          method: "DELETE",
        }),
      })
    };
  },
});

export const { useGetTodosQuery, useAddTodoMutation, useEditTodoMutation, useDeleteTodoMutation } = todoListApiSlice;
