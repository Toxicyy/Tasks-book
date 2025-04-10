import { useNavigate } from "react-router-dom";
import Aside from "../components/MainPage/Aside";
import ProfileMain from "../components/ProfilePage/ProfileMain";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setUser } from "../state/user.slice";

export default function UserProfilePage() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("user");
  const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (currentUser) {
          dispatch(setUser(JSON.parse(currentUser)));
        } else {
          navigate("/login");
        }
      }, []);
  return (
    <div className="flex">
      <div onClick={() => navigate("/main")}>
        <Aside />
      </div>
      <ProfileMain />
    </div>
  );
}
