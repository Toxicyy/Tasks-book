import FileUpload from "./FileUpload";
import Anonym from "../../../images/mainPage/header/Anonym.jpg";
import { AppState } from "../../../store";
import { useSelector } from "react-redux";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import Facebook from "../../../images/loginPage/facebook.png";
import Twitter from "../../../images/loginPage/twitter.png";
import Instagram from "../../../images/loginPage/instagram.png";
import LinkedIn from "../../../images/loginPage/linkedIn.png";
import usernameVerification from "../../../authentification/usernameVerification";
import userEmailVerification from "../../../authentification/userEmailVerification";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../state/userApi.slice";
import { useGetMediaQuery } from "../../../state/MediaApi.slice";

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
  const {data: media, isLoading, refetch: refetchMedia} = useGetMediaQuery();
  const [avatar, setAvatar] = useState(Anonym);  
  const [avatarFile, setAvatarFile] = useState(null);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleFileChange = (file: any) => {
    if (file) {
      setAvatar(URL.createObjectURL(file));
      setAvatarFile(file);
    }
  };

  useEffect(() => {
    if (currentUser?.user.avatarSrc) {
      setAvatar(`http://localhost:5000/${currentUser.user.avatarSrc}`);
    } else {
      setAvatar(Anonym);
    }
  }, [currentUser]);

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
    if (avatarFile) {
      const formData = new FormData();
      const token = localStorage.getItem("token");
      formData.append("avatar", avatarFile);
      try {
        await fetch("http://localhost:5000/api/upload-avatar", {
          method: "POST",
          body: formData,
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
    refetch()
    return;
  }

  useEffect(() => {
    setNewName(currentUser?.user.username);
    setNewEmail(currentUser?.user.email);
  }, [currentUser]);

  useEffect(() => {
    refetchMedia();
  }, [media]);
  function handleToggle() {
    setChecked(!checked);
  }

  return (
    <div
      className={
        "w-[55vw] min-w[300px] flex shadow-xl rounded-xl p-[20px] justify-center gap-[60px] duration-500 flex-wrap mb-[30px] xl:w-[37.4vw] md:justify-normal " +
        (theme ? " bg-[#2C3440]" : "bg-[#FFFFFF]")
      }
    >
      <div className="flex flex-col items-center">
        <img
          className="w-[150px] h-[150px] rounded-[75px]"
          src={avatar}
          alt="Avatar"
        />
        <div className="cursor-pointer">
          <FileUpload onFileChange={handleFileChange} />
        </div>
      </div>
      <div className="flex flex-col w-[60%]">
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
                  width: 'full',
                  height: "44px",
                  background: "#222831",
                  border: "1px solid #29A19C",
                  color: "#29A19C",
                  marginBottom: "30px",
                }
              : {
                  width: "full",
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
                  width: "full",
                  height: "44px",
                  background: "#222831",
                  border: "1px solid #29A19C",
                  color: "#29A19C",
                  marginBottom: "10px",
                }
              : {
                  width: "full",
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
        {(media && !isLoading) ? <div className="flex gap-[20px] mb-[30px]">
          {media.media.facebook && <a href={media.media.facebook}>
            <img className="w-[32px] h-[32px]" src={Facebook} alt="" />
          </a>}
          {media.media.twitter && <a href={media.media.twitter}>
            <img className="w-[32px] h-[32px]" src={Twitter} alt="" />
          </a>}
          {media.media.instagram && <a href={media.media.instagram}>
            <img className="w-[32px] h-[32px]" src={Instagram} alt="" />
          </a>}
          {media.media.linkedIn && <a href={media.media.linkedIn}>
            <img className="w-[32px] h-[32px]" src={LinkedIn} alt="" />
          </a>}
        </div> : <h1 className="text-gray-400 text-sm mt-[-10px] mb-[15px]">пока что вы не добавили социальные сети...</h1>}
        <Button
          type="primary"
          htmlType="button"
          style={{
            backgroundColor: "#29A19C",
            width: "20vw",
            height: "44px",
            borderRadius: "10px",
          }}
          onClick={() => handleClick()}
        >
          {" "}
          <p className="text-[16px] font-semibold tracking-wider">
            Сохранить
          </p>
        </Button>
      </div>
    </div>
  );
}
