import FileUpload from "./FileUpload";
import Anonym from "../../../images/mainPage/header/Anonym.jpg";
import { AppState } from "../../../store";
import { useSelector } from "react-redux";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import Facebook from "../../../images/loginPage/facebook.png";
import Twitter from "../../../images/loginPage/twitter.png";
import usernameVerification from "../../../authentification/usernameVerification";
import userEmailVerification from "../../../authentification/userEmailVerification";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../state/userApi.slice";

export default function UserForm() {
  const { data: currentUser, refetch } = useGetUserQuery();
  const [checked, setChecked] = useState(false);
  const [newName, setNewName] = useState(currentUser?.user.username);
  const [newEmail, setNewEmail] = useState(currentUser?.user.email);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fetchError, setFetchError] = useState(false);
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  const [updateUser, {}] = useUpdateUserMutation();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleClick() {
    if (newName) {
      if (!(newName === currentUser?.user.username)) {
        const verification = await usernameVerification(newName);
        if (
          verification &&
          newName.length > 3 &&
          newName.length < 20 &&
          !fetchError
        ) {
          if (currentUser) {
            updateUser({ ...currentUser?.user, username: newName });
          }
        } else if (verification) {
          setNameError("");
        } else {
          setFetchError(true);
          setNameError("Никнейм занят");
        }
      }
    }
    if (newEmail) {
      if (!(newEmail === currentUser?.user.email)) {
        const verification = await userEmailVerification(newEmail);
        if (verification && emailPattern.test(newEmail) && !fetchError) {
          if (currentUser) {
            updateUser({ ...currentUser?.user, email: newEmail });
          }
        } else if (!emailPattern.test(newEmail)) {
          setEmailError("Неверный формат почты");
        } else if (verification) {
          setNameError("");
        } else {
          setFetchError(true);
          setEmailError("Почта занята");
        }
      }
    }
    refetch()
    return;
  }

  useEffect(() => {
    setNewName(currentUser?.user.username);
    setNewEmail(currentUser?.user.email);
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
              : {
                  width: "23vw",
                  background: "#FAFAFA",
                  marginBottom: "30px",
                  height: "44px",
                }
          }
          className="custom-input-profile"
          onChange={(e) => {
            setNewName(e.target.value);
            if (nameError) setNameError("");
            if (fetchError) setFetchError(false);
          }}
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
              : {
                  width: "23vw",
                  background: "#FAFAFA",
                  marginBottom: "10px",
                  height: "44px",
                }
          }
          className="custom-input-profile"
          onChange={(e) => {
            setNewEmail(e.target.value);
            if (emailError) setEmailError("");
            if (fetchError) setFetchError(false);
          }}
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
