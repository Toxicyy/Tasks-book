import { createSlice } from "@reduxjs/toolkit";

type taskStatistic = {
    taskDone: number;
    taskTotal: number;
    taskDeleted: number;
    taskEdited: number;
}

const initialState:taskStatistic = {
    taskTotal: 0,
    taskDone: 0,
    taskDeleted: 0,
    taskEdited: 0
}

export const taskStatisticSlice = createSlice({
    name: "taskStatistic",
    initialState,
    reducers: {
        addTask: (state) => {
            state.taskTotal += 1
        },
        deleteTask: (state) => {
            state.taskDeleted += 1
        },
        doneTask: (state) => {
            state.taskDone += 1
        },
        editTask: (state) => {
            state.taskEdited += 1
        }
    }
})

export const {addTask, deleteTask, doneTask, editTask} = taskStatisticSlice.actions

export default taskStatisticSlice.reducer