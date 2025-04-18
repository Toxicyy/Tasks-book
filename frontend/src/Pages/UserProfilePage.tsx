import { useNavigate } from "react-router-dom";
import Aside from "../components/MainPage/Aside";
import ProfileMain from "../components/ProfilePage/ProfileMain";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store";
import { toggleNightMode } from "../state/NightMode.slice";
import { setToken } from "../state/auth.slice";
import { newApi } from "../shared/api";

export default function UserProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: AppState) => state.nightMode.mode);

  useEffect(() => {
    const localTheme = localStorage.getItem("nightMode");
    if (localTheme && theme !== JSON.parse(localTheme))
      dispatch(toggleNightMode());
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
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
    <div
      className={
        "flex duration-500 xl:pb-[258px] lg:pb-[50px] " +
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
