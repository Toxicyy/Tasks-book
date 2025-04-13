import { useDispatch, useSelector } from "react-redux";
import Aside from "../components/MainPage/Aside";
import Main from "../components/MainPage/Main";
import { AppDispatch, AppState } from "../store";
import { useEffect } from "react";
import { setUser } from "../state/user.slice";
import { useNavigate } from "react-router-dom";
import { closeDropdown } from "../state/Dropdown.slice";
import { toggleNightMode } from "../state/NightMode.slice";
import { setToken } from "../state/auth.slice";

export default function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isDropDown = useSelector((state: AppState) => state.dropdown.isOpen);
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  const token2 = useSelector((state: AppState) => state.auth.token);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
    dispatch(setToken(token));
    }
    const localTheme = localStorage.getItem("nightMode");
    if(localTheme && theme !== JSON.parse(localTheme)) dispatch(toggleNightMode());
    console.log("АЛО")
    if (!token) {
      navigate("/login");
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("nightMode", JSON.stringify(theme));
  }, [theme]);
  return (
    <div className="flex" onClick={isDropDown ? () => {dispatch(closeDropdown())} : () => {}}>
      <Aside />
      <Main />
    </div>
  );
}
