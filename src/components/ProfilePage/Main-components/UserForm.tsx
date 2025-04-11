import FileUpload from "./FileUpload";
import Anonym from "../../../images/mainPage/header/Anonym.jpg";
import { AppDispatch, AppState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import Facebook from "../../../images/loginPage/facebook.png";
import Twitter from "../../../images/loginPage/twitter.png";
import { editEmail, editName } from "../../../state/user.slice";
import { api } from "../../../shared/api";
import usernameVerification from "../../../authentification/usernameVerification";
import userEmailVerification from "../../../authentification/userEmailVerification";

export default function UserForm() {
  const currentUser = useSelector((state: AppState) => state.userSlice);
  const dispatch = useDispatch<AppDispatch>();
  const [checked, setChecked] = useState(false);
  const [newName, setNewName] = useState(currentUser.name);
  const [newEmail, setNewEmail] = useState(currentUser.email);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fetchError, setFetchError] = useState(false);
  const theme = useSelector((state: AppState) => state.nightMode.mode);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleClick() {
    if (!(newName === currentUser.name)) {
      const verification = await usernameVerification(newName);
      console.log(1, "name")
      if (verification && newName.length > 3 && newName.length < 20 && !fetchError) {
        dispatch(editName(newName));
        api.user.updateUser({ ...currentUser, name: newName }, currentUser.id);
        localStorage.setItem("user", JSON.stringify({ ...currentUser, name: newName }));
        console.log(2, "name")
      } else if(verification){
        setNameError("");
        console.log(3, "name")
      }
      else {
        setFetchError(true)
        setNameError("Никнейм занят");
        console.log(4, "name")
      }
    }
    if (!(newEmail === currentUser.email)) {
      const verification = await userEmailVerification(newEmail);
      console.log(1, "email")
      if (verification && emailPattern.test(newEmail) && !fetchError) {
        dispatch(editEmail(newEmail));
        api.user.updateUser(
          { ...currentUser, email: newEmail },
          currentUser.id
        );
        localStorage.setItem("user", JSON.stringify({ ...currentUser, email: newEmail }));
        console.log(2, "email")
      } else if (!emailPattern.test(newEmail)) {
        setEmailError("Неверный формат почты");
        console.log(3, "email")
      } else if(verification){
        setNameError("");
        console.log(4, "email")
      } else {
        setFetchError(true)
        setEmailError("Почта занята");
        console.log(5, "email")
      }
    }
    return;
  }

  useEffect(() => {
    setNewName(currentUser.name);
    setNewEmail(currentUser.email);
    console.log("update");
  }, [currentUser]);

  function handleToggle() {
    setChecked(!checked);
  }

  return (
    <div
      className={
        "w-[37.4vw] min-w[300px] flex shadow-xl rounded-xl p-[20px] justify-between duration-500 flex-wrap mb-[30px] " +
        (theme ? " bg-[#2C3440]" : "bg-[#FFFFFF]")
      }
    >
      <div className="flex flex-col items-center">
        <img
          className="w-[150px] h-[150px] rounded-[75px]"
          src={Anonym}
          alt="Avatar"
        />
        <div className="cursor-pointer">
          <FileUpload />
        </div>
      </div>
      <div className="flex flex-col">
        <h1
          className={
            "font-semibold text-[16px] mb-[10px] " +
            (theme ? " text-white" : " text-[#282846]")
          }
        >
          Ваш никнейм:
        </h1>
        <Input
          status={nameError ? "error" : ""}
          value={newName}
          style={
            theme
              ? {
                  width: "23vw",
                  height: "44px",
                  background: "#222831",
                  border: "1px solid #29A19C",
                  color: "#29A19C",
                  marginBottom: "30px",
                  
                }
              : { width: "23vw", background: "#FAFAFA", marginBottom: "30px", height:"44px" }
          }
          className="custom-input-profile"
          onChange={(e) => {
            setNewName(e.target.value) 
            if(nameError) setNameError("")
            if(fetchError) setFetchError(false)
            }
          }
        />
        <p className="text-[#FF0000] mt-[-30px]">{nameError}</p>
        <h1
          className={
            "font-semibold text-[16px] mb-[10px] " +
            (theme ? " text-white" : " text-[#282846]")
          }
        >
          Ваша почта:
        </h1>
        <Input
          status={emailError ? "error" : ""}
          value={newEmail}
          style={
            theme
              ? {
                  width: "23vw",
                  height: "44px",
                  background: "#222831",
                  border: "1px solid #29A19C",
                  color: "#29A19C",
                  marginBottom: "10px",
                }
              : { width: "23vw", background: "#FAFAFA", marginBottom: "10px", height:"44px" }
          }
          className="custom-input-profile"
          onChange={(e) =>{ 
            setNewEmail(e.target.value)
            if(emailError) setEmailError("")
            if(fetchError) setFetchError(false)
            }
          }
        />
        <p className="text-[#FF0000] mt-[-10px]">{emailError}</p>
        <div className="flex gap-[10px] items-center mb-[30px] mt-[10px]">
          <div
            className="w-5 h-5 rounded-sm border-[#29A19C] border-2 flex justify-center items-center transition-all duration-300 ease-in-out cursor-pointer"
            onClick={handleToggle}
          >
            {checked && (
              <CheckOutlined
                style={{ color: "#29A19C", width: "13px", height: "11px" }}
              />
            )}
          </div>
          <h1
            className={
              "text-[16px]" + (theme ? " text-white" : " text-[#282846]")
            }
          >
            Подписаться на рассылку
          </h1>
        </div>
        <h1
          className={
            "font-semibold text-[16px] mb-[10px]" +
            (theme ? " text-white" : " text-[#282846]")
          }
        >
          Ваши социальные сети:
        </h1>
        <div className="flex gap-[20px] mb-[30px]">
          <a href="">
            <img className="w-[32px] h-[32px]" src={Facebook} alt="" />
          </a>
          <a href="">
            <img className="w-[32px] h-[32px]" src={Twitter} alt="" />
          </a>
        </div>
        <Button
          type="primary"
          htmlType="button"
          style={{
            backgroundColor: "#29A19C",
            width: "250px",
            height: "44px",
            borderRadius: "10px",
          }}
          onClick={() => handleClick()}
        >
          {" "}
          <p className="text-[16px] font-semibold tracking-wider">
            Сохранить изменения
          </p>
        </Button>
      </div>
    </div>
  );
}
