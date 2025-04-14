import { useDispatch, useSelector } from "react-redux";
import Aside from "../components/MainPage/Aside";
import Main from "../components/MainPage/Main";
import { AppDispatch, AppState } from "../store";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { closeDropdown } from "../state/Dropdown.slice";
import { toggleNightMode } from "../state/NightMode.slice";
import { setToken } from "../state/auth.slice";
import { newApi } from "../shared/api";

export default function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isDropDown = useSelector((state: AppState) => state.dropdown.isOpen);
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }

    const localTheme = localStorage.getItem("nightMode");
    if (localTheme && theme !== JSON.parse(localTheme)) {
      dispatch(toggleNightMode());
    }

    isTokenValid();
  }, []);

  useEffect(() => {
    localStorage.setItem("nightMode", JSON.stringify(theme));
  }, [theme]);

  async function isTokenValid() {
    newApi.ValidateToken(localStorage.getItem("token")!).then((response) => {
      if (!response.ok) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    });
  }

  return (
    <div className="flex" onClick={isDropDown ? () => {dispatch(closeDropdown())} : () => {}}>
      <Aside />
      <Main />
    </div>
  );
}
