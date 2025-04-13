import { useNavigate } from "react-router-dom";
import Aside from "../components/MainPage/Aside";
import ProfileMain from "../components/ProfilePage/ProfileMain";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store";
import { setUser } from "../state/user.slice";
import { toggleNightMode } from "../state/NightMode.slice";

export default function UserProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const localTheme = localStorage.getItem("nightMode");
    if (localTheme && theme !== JSON.parse(localTheme)) dispatch(toggleNightMode());
    if(!token){
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("nightMode", JSON.stringify(theme));
  }, [theme]);
  return (
    <div
      className={
        "flex duration-500 pb-[236px] " +
        (theme ? " bg-[#222831]" : "bg-[#FAFAFA]")
      }
    >
      <div onClick={() => navigate("/main")}>
        <Aside />
      </div>
      <ProfileMain />
    </div>
  );
}
