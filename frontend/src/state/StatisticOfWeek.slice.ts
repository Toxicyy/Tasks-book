import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { taskStatistic} from "../types/taskStatistic"

type StatisticOfWeekState = {
    weekStatistic: taskStatistic[]
}

const initialState:StatisticOfWeekState = {
    weekStatistic: [
        {tasks: 6, completed: 4, deleted: 2, edited: 3},
        {tasks: 7, completed: 5, deleted: 2, edited: 2},
        {tasks: 8, completed: 6, deleted: 2, edited: 4},
        {tasks: 9, completed: 6, deleted: 3, edited: 5},
        {tasks: 10, completed: 5, deleted: 5, edited: 6},
        {tasks: 11, completed: 10, deleted: 1, edited: 7},
        {tasks: 12, completed: 12, deleted: 0, edited: 8}
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