import { createSlice } from "@reduxjs/toolkit";

export type NightModeState= {
    mode: boolean;
}

const initialState: NightModeState = {
    mode: false,
}

export const nightModeSlice = createSlice({
    name: 'nightMode',
    initialState,
    reducers: {
        toggleNightMode: (state: NightModeState) => {
            state.mode = !state.mode;
            localStorage.setItem("nightMode", JSON.stringify(state.mode));
        },
    },
})

export const { toggleNightMode } = nightModeSlice.actions;

export default nightModeSlice.reducer;