import { configureStore } from "@reduxjs/toolkit";
import { nightModeSlice } from "./state/NightMode.slice";
import { addTodoModalSlice } from "./state/AddTodoModal.slice";
import { statisticOfWeekSlice } from "./state/StatisticOfWeek.slice";
import { dropdownSlice } from "./state/Dropdown.slice";
import { todoListApiSlice } from "./state/todoListApi.slice";
import { authSlice } from "./state/auth.slice";
import { userApiSlice } from "./state/userApi.slice";
import { forceUpdateSlice } from "./state/forceUpdate.slice";
import { taskStatisticApiSlice } from "./state/taskStatisticApi.slice";
import { categoriesApiSlice } from "./state/categoriesApi.slice";
import { mediaApiSlice } from "./state/MediaApi.slice";

export const store = configureStore({
  reducer: {
    nightMode: nightModeSlice.reducer,
    addTodoModal: addTodoModalSlice.reducer,
    statisticOfWeek: statisticOfWeekSlice.reducer,
    dropdown: dropdownSlice.reducer,
    auth: authSlice.reducer,
    forceUpdate: forceUpdateSlice.reducer,
    todoListApi: todoListApiSlice.reducer,
    userApi: userApiSlice.reducer,
    taskStatisticApi: taskStatisticApiSlice.reducer,
    categoriesApi: categoriesApiSlice.reducer,
    mediaApi: mediaApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(todoListApiSlice.middleware)
      .concat(userApiSlice.middleware)
      .concat(taskStatisticApiSlice.middleware)
      .concat(categoriesApiSlice.middleware)
      .concat(mediaApiSlice.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
