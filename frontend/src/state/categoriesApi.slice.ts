import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category, CategoryId, CategoryState } from "../types/category";

export const categoriesApiSlice = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryState, void>({
      query: () => "/category",
    }),
    addCategory: builder.mutation<Category, Omit<Category, "id">>({
      query: (category) => ({
        url: "/category",
        method: "POST",
        body: category,
      }),
    }),
    deleteCategory: builder.mutation<Category, CategoryId>({
      query: (id) => ({
        url: `/category`,
        method: "DELETE",
        body: { id },
      }),
    }),
    updateCategory: builder.mutation<Category, Category>({
      query: (category) => ({
        url: `/category`,
        method: "PUT",
        body: category,
      }),
    }),
    initialCategories: builder.mutation<CategoryState, Category[]>({
      query: (categories) => ({
        url: "/category/initial",
        method: "POST",
        body: categories,
      }),
    }),
    makeCategoryActive: builder.mutation<CategoryState, CategoryId>({
      query: (id) => ({
        url: "/category/makeActive",
        method: "PUT",
        body: { id },
      }),
    })
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useInitialCategoriesMutation,
  useMakeCategoryActiveMutation
} = categoriesApiSlice;
