import { createSlice } from "@reduxjs/toolkit"
import House from "../images/House.png";
import Family from "../images/Family.png";
import Work from "../images/Work.png";
import Sport from "../images/Sport.png"; 

export type TabState = {
    src: string,
    title: string,
    id: number
    isHover:boolean
    isActive: boolean
    isInitial: boolean
}

export type TabId = number;

type TabsState = TabState[]

const initialTabsState:TabsState = [
    {
        src: House,
        title: 'Дом',
        id: 1,
        isHover: false,
        isActive: true,
        isInitial: true
    },
    {
        src: Family,
        title: 'Семья',
        id: 2,
        isHover: false,
        isActive: false,
        isInitial: true,
    },
    {
        src: Work,
        title: 'Работа',
        id: 3,
        isHover: false,
        isActive: false,
        isInitial: true
    },
    {
        src: Sport,
        title: 'Спорт',
        id: 4,
        isHover: false,
        isActive: false,
        isInitial: true
    }

]
export const tabsSlice = createSlice({
    name: 'tabs',
    initialState: initialTabsState,
    reducers: {
        addTab: (state, action) => {
            state.push(action.payload)
        },
        removeTab: (state, action) => {
            state.splice(action.payload, 1)
        },
        changeTab: (state, action) => {
            state[action.payload.id] = action.payload
        },
        tabHover: (state, action:{payload:{id: number, ishover: boolean}}) => {
            state[action.payload.id].isHover = action.payload.ishover
        },
        makeTabActive: (state, action:{payload:{id: number}}) => {
            state[action.payload.id].isActive = true
            for(let i = 0; i < state.length; i++) {
                if(i !== action.payload.id) {
                    state[i].isActive = false
                }
            }
        }
    }
})

export const { addTab, removeTab, changeTab, tabHover, makeTabActive } = tabsSlice.actions

export default tabsSlice.reducer;
