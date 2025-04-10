import FileUpload from "./FileUpload";
import Anonym from "../../../images/Anonym.jpg";
import { AppDispatch, AppState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import Facebook from "../../../images/facebook.png";
import Twitter from "../../../images/twitter.png";
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

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleClick() {
    if (!(newName === currentUser.name)) {
      const verification = await usernameVerification(newName);
      if (verification) {
        dispatch(editName(newName));
        api.user.updateUser({...currentUser, name: newName}, currentUser.id);
      } else {
        setNameError("Никнейм занят");
      }
    }
    if (!(newEmail === currentUser.email)) {
      const verification = await userEmailVerification(newEmail);
      if (verification && emailPattern.test(newEmail)) {
        dispatch(editEmail(newEmail));
        api.user.updateUser({...currentUser, email: newEmail}, currentUser.id);
      } else if (!emailPattern.test(newEmail)) {
        setEmailError("Неверный формат почты");
      } else {
        setEmailError("Почта занята");
      }
    }
    return;
  }

  

  useEffect(() => {
    setNewName(currentUser.name);
    setNewEmail(currentUser.email)
    console.log("update")
  }, [currentUser]);

  function handleToggle() {
    setChecked(!checked);
  }

  return (
    <div className="w-[37.4vw] bg-[#FFFFFF] flex shadow-xl rounded-xl p-[20px] justify-between flex-wrap">
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
        <h1 className="font-semibold text-[16px] mb-[10px]">Ваш никнейм:</h1>
        <Input
          status={nameError ? "error" : ""}
          value={newName}
          style={{ width: "23vw", height: "44px", marginBottom: "30px" }}
          onChange={(e) => setNewName(e.target.value)}
        />
        <p>{nameError}</p>
        <h1 className="font-semibold text-[16px] mb-[10px]">Ваша почта:</h1>
        <Input
          status={emailError ? "error" : ""}
          value={newEmail}
          style={{ width: "23vw", height: "44px", marginBottom: "10px" }}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <p>{emailError}</p>
        <div className="flex gap-[10px] items-center mb-[30px]">
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
          <h1 className="text-[16px]">Подписаться на рассылку</h1>
        </div>
        <h1 className="font-semibold text-[16px] mb-[10px]">
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
          <p
            className="text-[16px] font-semibold tracking-wider"
          >
            Сохранить изменения
          </p>
        </Button>
      </div>
    </div>
  );
}
