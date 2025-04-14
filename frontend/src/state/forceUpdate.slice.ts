import { createSlice } from "@reduxjs/toolkit";

type ForceUpdateState = {
    todoUpdate: boolean;
    statisticUpdate: boolean;
}

const initialState: ForceUpdateState = {
    todoUpdate: false,
    statisticUpdate: false
}

export const forceUpdateSlice = createSlice({
    name: "forceUpdate",
    initialState,
    reducers: {
        updateTodo: (state) => { state.todoUpdate = !state.todoUpdate; },
        updateStatistic: (state) => { state.statisticUpdate = !state.statisticUpdate;},
    }
})

export const { updateTodo, updateStatistic } = forceUpdateSlice.actions

export default forceUpdateSlice.reducer