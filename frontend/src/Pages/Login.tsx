import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/LoginPage/Footer";
import Header from "../components/LoginPage/Header";
import MainForm from "../components/LoginPage/MainForm";
import { AppDispatch, AppState } from "../store";
import { useEffect } from "react";
import "../theme.css";
import { toggleNightMode } from "../state/NightMode.slice";

export default function Login() {
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    document.body.style.backgroundColor = theme ? "#222831" : "#FAFAFA";
  }, [theme]);
  useEffect(() => {
      const localTheme = localStorage.getItem("nightMode");
      if(localTheme && theme !== JSON.parse(localTheme)) dispatch(toggleNightMode());
    }, []);
    useEffect(() => {
      localStorage.setItem("nightMode", JSON.stringify(theme));
    }, [theme]);
  return (
    <div className="flex flex-col h-[100%] gap-[23vh]">
      <Header />
      <MainForm />
      <Footer />
    </div>
  );
}
