import { configureStore } from "@reduxjs/toolkit";
import { nightModeSlice } from "./state/NightMode.slice";
import { userSlice } from "./state/user.slice";
import { tabsSlice } from "./state/Tabs.slice";

export const store = configureStore({
    reducer:{
        [nightModeSlice.name]: nightModeSlice.reducer,
        userSlice: userSlice.reducer,
        tabs: tabsSlice.reducer
    }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch