import { createSlice } from "@reduxjs/toolkit";

type Todo = {
    id: number;
    title: string;
    completed: boolean;
    category: string;
};

type TodoState = {
    todos: Todo[];
};

const initialState: TodoState = {
    todos: [
        { id: 1, title: "Task 1", completed: false, category:"Дом" },
        { id: 2, title: "Task 2", completed: false, category:"Дом" },
    ],
};

export const todoListSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: { payload: Todo }) => {
            state.todos.push(action.payload);
        },
        deleteTodo: (state, action: { payload: number }) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        toggleTodo: (state, action: { payload: number }) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        editTodo: (state, action: { payload: { id: number; title: string } }) => {
            const { id, title } = action.payload;
            const todo = state.todos.find((todo) => todo.id === id);
            if (todo) {
                todo.title = title;
            }
        }
    },   
});

export const { addTodo, deleteTodo, toggleTodo, editTodo } = todoListSlice.actions

export default todoListSlice.reducer