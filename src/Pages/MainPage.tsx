import { useDispatch } from "react-redux";
import Aside from "../components/MainPage/Aside";
import Main from "../components/MainPage/Main";
import { AppDispatch } from "../store";
import { useEffect } from "react";
import { setUser } from "../state/user.slice";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    if (currentUser) {
      dispatch(setUser(JSON.parse(currentUser)));
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex">
      <Aside />
      <Main />
    </div>
  );
}
