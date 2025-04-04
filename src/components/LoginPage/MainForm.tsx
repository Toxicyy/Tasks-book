import { Input, Button } from "antd";
import facebook from "../../images/facebook.png";
import twitter from "../../images/twitter.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../store";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import login from "../../authentification/login";
import { useState } from "react";
import { setUser } from "../../state/user.slice";

export default function MainForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()

  async function handleClick(email: string, password: string) {
    const response = await login(email, password);
    if (response) {
      dispatch(setUser(response))
      navigate("/main");
    }
    else{
      setError(true)
    }
  }
  return (
    <>
      <div className="flex items-center justify-center font-['Roboto']">
        <div
          id="mainForm"
          className={
            "w-[350px] h-[375px] shadow-xl rounded-xl " +
            (theme ? "bg-[#2C3440]" : "bg-[#FAFAFA]")
          }
        >
          <h1 className=" font-medium text-lg/[23px] text-[#29A19C] flex items-center justify-center mt-[20px]">
            Вход в аккаунт
          </h1>
          <form
            action=""
            className="flex flex-col gap-[20px] justify-center items-center"
          >
            <Input
              className="custom-input-login dark-mode-autofill"
              style={
                theme
                  ? {
                      width: "310px",
                      background: "#222831",
                      border: "1px solid #29A19C",
                      color: "#29A19C",
                      marginTop: "20px",
                    }
                  : { width: "310px", background: "#FAFAFA", marginTop: "20px" }
              }
              placeholder="E-mail"
              onChange={(e) => {
                setEmail(e.target.value)
                setError(false)
              }}
            />
            <Input.Password
              className="custom-input-login"
              style={
                theme
                  ? {
                      width: "310px",
                      background: "#222831",
                      border: "1px solid #29A19C",
                      color: "#29A19C",
                    }
                  : { width: "310px", background: "#FAFAFA" }
              }
              placeholder="Пароль"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={(e) => {
                setError(false);
                setPassword(e.target.value)
              }}
            />
            {error && (
              <span className="error-message text-red-500 mt-[-15px] mb-[-15px] ml-[-105px] text-sm">
                Неверный логин или пароль
              </span>
            )}

            <Button
              style={
                theme
                  ? {
                      background: "#29A19C",
                      width: "98px",
                      height: "42px",
                      borderRadius: "10px",
                      color: "white",
                      border: "1px solid #222831",
                    }
                  : {
                      background: "#29A19C",
                      width: "98px",
                      height: "42px",
                      borderRadius: "10px",
                      color: "white",
                    }
              }
              onClick={() => handleClick(email, password)}
              
            >
              Войти
            </Button>
            <h1
              id="MainFormText"
              className={
                "text-s " + (theme ? "text-gray-400" : "text-[#222831]")
              }
            >
              Еще нет аккаунта?{" "}
              <Link className="text-[#29A19C]" to="/registration">
                Регистрация
              </Link>
            </h1>
            <div className="flex items-center justify-around gap-[15px]">
              <div className="w-[122px] h-[1.5px] bg-gray-300"></div>
              <h1 className="text-gray-400">или</h1>
              <div className="w-[122px] h-[1.5px] bg-gray-300"></div>
            </div>
            <div className="flex items-center justify-center gap-[20px]">
              <a href="https://facebook.com">
                <img className="w-[32px] h-[32px]" src={facebook} alt="" />
              </a>
              <a href="https://twitter.com">
                <img className="w-[32px] h-[32px]" src={twitter} alt="" />
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
