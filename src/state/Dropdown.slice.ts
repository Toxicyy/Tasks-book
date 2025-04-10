import { createSlice } from "@reduxjs/toolkit";

type DropdownState = {
    isOpen: boolean;
}

const initialState: DropdownState = {
    isOpen: false,
}

export const dropdownSlice = createSlice({
    name: 'dropdown',
    initialState,
    reducers: {
        openDropdown: (state) => {
            state.isOpen = true;
        },
        closeDropdown: (state) => {
            state.isOpen = false;
        },
    },
})

export const { openDropdown, closeDropdown } = dropdownSlice.actions

export default dropdownSlice.reducer