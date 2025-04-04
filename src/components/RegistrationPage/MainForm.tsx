import { Input, Button } from "antd";
import facebook from "../../images/facebook.png";
import twitter from "../../images/twitter.png";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import registration from "../../authentification/registration";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainForm() {
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mailError, setMailError] = useState<string>("");
  const [passError, setPassError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const navigate = useNavigate();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const beginWithoutDigit = /^\D.*$/;
  const withoutSpecialChars = /^[^-() /]*$/;
  const containsLetters = /^.*[a-zA-Z]+.*$/;
  const minimum8Chars = /^.{8,}$/;
  const withoutSpaces = /\S+/;

  async function handleClick(name: string, email: string, password: string) {
    setMailError("");
    setPassError("");
    setUsernameError("");
    if (!emailPattern.test(email)) return setMailError("Неверный формат почты");
    if (!beginWithoutDigit.test(password))
      return setPassError("Пароль не может начинаться с цифры");
    if (!withoutSpaces.test(password))
      return setPassError("Пароль не должен содержать пробелы");
    if (!withoutSpecialChars.test(password))
      return setPassError("Не используйте специальные символы");
    if (!containsLetters.test(password))
      return setPassError("Пароль должен содержать хотя бы одну букву");
    if (!minimum8Chars.test(password))
      return setPassError("Пароль должен содержать не менее 8 символов");

    const status = await registration(name, email, password);
    if (status === -1)
      setUsernameError("Пользователь с таким именем уже существует");
    if (status === -2)
      setMailError("Пользователь с такой почтой уже существует");
    if (status !== -1 && status !== -2) {
      navigate("/login");
    }
    console.log(status);
  }

  return (
    <>
      <div className="flex items-center justify-center font-['Roboto'] w-[100%]">
        <div
          id="mainForm"
          className={
            "w-[350px] h-[375px] shadow-xl rounded-xl " +
            (theme ? "bg-[#2C3440]" : "bg-[#FAFAFA]")
          }
        >
          <h1 className=" font-medium text-lg/[23px] text-[#29A19C] flex items-center justify-center mt-[20px]">
            Регистрация
          </h1>
          <form
            action=""
            className="flex flex-col gap-[20px] justify-center items-center"
          >
            <Input
              className="custom-input-login"
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
              placeholder="Имя пользователя"
              onChange={(e) => setName(e.target.value)}
              status={usernameError ? "error" : ""}
            />
            {usernameError && (
              <div className="text-red-500 ml-[-40px] text-xs mt-[-20px] mb-[-20px]">
                {usernameError}
              </div>
            )}
            <Input
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
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              status={mailError ? "error" : ""}
            />
            {mailError && (
              <div className="text-red-500 ml-[-40px] text-xs mt-[-20px] mb-[-20px]">
                {mailError}
              </div>
            )}
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
              onChange={(e) => setPassword(e.target.value)}
              status={passError ? "error" : ""}
            />
            {passError && (
              <div className="text-red-500 ml-[-30px] text-xs mt-[-20px] mb-[-20px]">
                {passError}
              </div>
            )}
            <Button
              style={
                theme
                  ? {
                      background: "#29A19C",
                      width: "110px",
                      height: "42px",
                      borderRadius: "10px",
                      color: "white",
                      border: "1px solid #222831",
                    }
                  : {
                      background: "#29A19C",
                      width: "110px",
                      height: "42px",
                      borderRadius: "10px",
                      color: "white",
                    }
              }
              onClick={() => handleClick(name, email, password)}
            >
              Подтвердить
            </Button>

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
