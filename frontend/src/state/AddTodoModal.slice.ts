import { createSlice } from "@reduxjs/toolkit";

type AddTodoModalSliceState = {
    isModalOpen: boolean;
}

const initialState: AddTodoModalSliceState = {
    isModalOpen: false,
}

export const addTodoModalSlice = createSlice({
    name: "addTodoModal",
    initialState,
    reducers: {
        openModal: (state) => { state.isModalOpen = true; },
        closeModal: (state) => { state.isModalOpen = false; },
    },
});

export const { openModal, closeModal } = addTodoModalSlice.actions;

export default addTodoModalSlice.reducer;