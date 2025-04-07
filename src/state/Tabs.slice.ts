import { createSlice } from "@reduxjs/toolkit";
import House from "../images/House.png";
import Family from "../images/Family.png";
import Work from "../images/Work.png";
import Sport from "../images/Sport.png";
import HouseNight from "../images/HouseNight.png";
import FamilyNight from "../images/FamilyNight.png";
import WorkNight from "../images/WorkNight.png";
import SportNight from "../images/SportNight.png";

export type TabState = {
  src: string;
  nightSrc: string
  title: string;
  id: number;
  isHover: boolean;
  isActive: boolean;
  isInitial: boolean;
};

export type TabId = number;

type TabsState = TabState[];

const initialTabsState: TabsState = [
  {
    src: House,
    nightSrc: HouseNight,
    title: "Дом",
    id: 1,
    isHover: false,
    isActive: true,
    isInitial: true,
  },
  {
    src: Family,
    nightSrc: FamilyNight,
    title: "Семья",
    id: 2,
    isHover: false,
    isActive: false,
    isInitial: true,
  },
  {
    src: Work,
    nightSrc: WorkNight,
    title: "Работа",
    id: 3,
    isHover: false,
    isActive: false,
    isInitial: true,
  },
  {
    src: Sport,
    nightSrc: SportNight,
    title: "Спорт",
    id: 4,
    isHover: false,
    isActive: false,
    isInitial: true,
  },
];
export const tabsSlice = createSlice({
  name: "tabs",
  initialState: initialTabsState,
  reducers: {
    addTab: (state, action) => {
      state.push(action.payload);
    },
    removeTab: (state, action) => {
      state.splice(action.payload, 1);
    },
    changeTab: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    tabHover: (
      state,
      action: { payload: { id: number; ishover: boolean } }
    ) => {
      state[action.payload.id].isHover = action.payload.ishover;
    },
    makeTabActive: (state, action: { payload: { id: number } }) => {
      state[action.payload.id].isActive = true;
      for (let i = 0; i < state.length; i++) {
        if (i !== action.payload.id) {
          state[i].isActive = false;
        }
      }
    },
    
  },
});

export const {
  addTab,
  removeTab,
  changeTab,
  tabHover,
  makeTabActive,
} = tabsSlice.actions;

export default tabsSlice.reducer;
