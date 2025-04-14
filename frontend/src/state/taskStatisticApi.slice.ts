import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { taskStatisticState } from "../types/taskStatistic";


export const taskStatisticApiSlice = createApi({
    reducerPath: "taskStatisticApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
        prepareHeaders(headers){
            const token = localStorage.getItem("token");
            console.log(token)
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTaskStatistic: builder.query<taskStatisticState, void>({
            query: () => "/statistic",
        }),
        updateTaskStatistic: builder.mutation<taskStatisticState, taskStatisticState>({
            query: (taskStatistic) => ({
                url: "/statistic",
                method: "PUT",
                body: taskStatistic,
            }),
        }),
    }),
});

export const { useGetTaskStatisticQuery, useUpdateTaskStatisticMutation } = taskStatisticApiSlice;