import { createSlice } from "@reduxjs/toolkit";

type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

type TodoState = {
    todos: Todo[];
};

const initialState: TodoState = {
    todos: [
        { id: 1, title: "Task 1", completed: false },
        { id: 2, title: "Task 2", completed: false },
    ],
};

export const todoListSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
    },   
});

export const { addTodo, deleteTodo, toggleTodo } = todoListSlice.actions

export default todoListSlice.reducer