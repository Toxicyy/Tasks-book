import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MediaState } from "../types/media";

export const mediaApiSlice = createApi({
    reducerPath: "mediaApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        }
     }),
    endpoints: (builder) => ({
        getMedia: builder.query<MediaState, void>({
            query: () => "/media",
        }),
    }),
});

export const { useGetMediaQuery } = mediaApiSlice;