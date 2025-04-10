import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { taskStatistic } from "./TaskStatistic.slice"

type StatisticOfWeekState = {
    weekStatistic: taskStatistic[]
}

const initialState:StatisticOfWeekState = {
    weekStatistic: [
        {taskTotal: 6, taskDone: 4, taskDeleted: 2, taskEdited: 3},
        {taskTotal: 7, taskDone: 5, taskDeleted: 2, taskEdited: 2},
        {taskTotal: 8, taskDone: 6, taskDeleted: 2, taskEdited: 4},
        {taskTotal: 9, taskDone: 6, taskDeleted: 3, taskEdited: 5},
        {taskTotal: 10, taskDone: 5, taskDeleted: 5, taskEdited: 6},
        {taskTotal: 11, taskDone: 10, taskDeleted: 1, taskEdited: 7},
        {taskTotal: 12, taskDone: 12, taskDeleted: 0, taskEdited: 8}
    ]
}

export const statisticOfWeekSlice = createSlice({
    name: "statisticOfWeek",
    initialState,
    reducers: {
        addDayStatistic : (state, action : PayloadAction<{index: number, data: taskStatistic}>) => {
            state.weekStatistic[action.payload.index] = action.payload.data
        },
        resetStatistic : (state) => {
            state.weekStatistic = initialState.weekStatistic
        }
    }
})

export const {addDayStatistic, resetStatistic} = statisticOfWeekSlice.actions

export default statisticOfWeekSlice.reducer