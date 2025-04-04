import { useSelector } from "react-redux";
import Footer from "../components/LoginPage/Footer";
import Header from "../components/LoginPage/Header";
import MainForm from "../components/RegistrationPage/MainForm";
import { AppState } from "../store";
import { useEffect } from "react";

export default function Registration() {
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  useEffect(() => {
    document.body.style.backgroundColor = theme ? "#222831" : "#FAFAFA";
  }, [theme]);
  return (
    <div className={"flex flex-col h-[100%] gap-[23vh] "}>
      <Header />
      <MainForm />
      <Footer />
    </div>
  );
}
