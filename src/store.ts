import { configureStore } from "@reduxjs/toolkit";
import { nightModeSlice } from "./state/NightMode.slice";
import { userSlice } from "./state/user.slice";
import { tabsSlice } from "./state/Tabs.slice";
import { taskStatisticSlice } from "./state/TaskStatistic.slice";
import { todoListSlice } from "./state/TodoList.slice";
import { addTodoModalSlice } from "./state/AddTodoModal.slice";
import { statisticOfWeekSlice } from "./state/StatisticOfWeek.slice";
import { dropdownSlice } from "./state/Dropdown.slice";
import { todoListApiSlice } from "./state/todoListApi.slice";
import { authSlice } from "./state/auth.slice";
import { userApiSlice } from "./state/userApi.slice";
export const store = configureStore({
  reducer: {
    [nightModeSlice.name]: nightModeSlice.reducer,
    // user: userSlice.reducer,
    tabs: tabsSlice.reducer,
    taskStatistic: taskStatisticSlice.reducer,
    // todoList: todoListSlice.reducer,
    [addTodoModalSlice.name]: addTodoModalSlice.reducer,
    [statisticOfWeekSlice.name]: statisticOfWeekSlice.reducer,
    dropdown: dropdownSlice.reducer,
    [todoListApiSlice.reducerPath]: todoListApiSlice.reducer,
    auth: authSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoListApiSlice.middleware).concat(userApiSlice.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
