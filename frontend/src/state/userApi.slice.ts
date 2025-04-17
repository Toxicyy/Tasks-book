import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../types/userType";
import { UserState } from "../types/userState";

export const userApiSlice = createApi({
  reducerPath: "userApi",
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
      getUser: builder.query<UserState, void>({
        query: () => `/api/get/user`,
      }),
      updateUser: builder.mutation<UserState, User>({
        query: (user) => ({
          url: `/api/update/user`,
          method: "PUT",
          body: user,
        }),
      }),
    };
  },
});

export const { useGetUserQuery, useUpdateUserMutation } = userApiSlice;
