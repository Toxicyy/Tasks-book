import { useDispatch, useSelector } from "react-redux";
import Aside from "../components/MainPage/Aside";
import Main from "../components/MainPage/Main";
import { AppDispatch, AppState } from "../store";
import { useEffect } from "react";
import { setUser } from "../state/user.slice";
import { useNavigate } from "react-router-dom";
import { closeDropdown } from "../state/Dropdown.slice";

export default function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isDropDown = useSelector((state: AppState) => state.dropdown.isOpen);
  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    if (currentUser) {
      dispatch(setUser(JSON.parse(currentUser)));
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex" onClick={isDropDown ? () => {dispatch(closeDropdown())} : () => {}}>
      <Aside />
      <Main />
    </div>
  );
}
