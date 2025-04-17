import { Button, Input, Modal } from "antd";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../store";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { newApi } from "../../shared/api";
import { useNavigate } from "react-router-dom";
import { userApiSlice } from "../../state/userApi.slice";

type Props = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const SettingsModal: FC<Props> = ({ isModalOpen, handleOk, handleCancel }) => {
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordAgain, setNewPasswordAgain] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [newPassError, setNewPassError] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [linkedIn, setLinkedIn] = useState<string>("");
  const [regExpError, setRegExpError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const beginWithoutDigit = /^\D.*$/;
  const withoutSpecialChars = /^[^-() /]*$/;
  const containsLetters = /^.*[a-zA-Z]+.*$/;
  const withoutSpaces = /\S+/;

  const facebookRegex = /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_.-]+$/;
  const twitterRegex = /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_.-]+$/;
  const instagramRegex = /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.-]+$/;
  const linkedInRegex = /^https?:\/\/(www\.)?fr\.linkedin\.com\/[a-zA-Z0-9_.-]+$/;

  async function handleOkDelete() {
    const response = await newApi.deleteUser( localStorage.getItem("token")! );
    if(response.ok) {
      localStorage.removeItem("token");
      dispatch(userApiSlice.util.resetApiState());
      navigate("/login");
    }
    setIsModalOpenDelete(false);
  }

  function handleCancelDelete() {
    setIsModalOpenDelete(false);
  }

  function mediaCheck() {
    if(facebook){
      if(!facebookRegex.test(facebook)) {
        setRegExpError("facebook");
        return;
      }
    }
    if(twitter){
      if(!twitterRegex.test(twitter)) {
        setRegExpError("twitter");
        return;
      }
    }
    if(instagram){
      if(!instagramRegex.test(instagram)) {
        setRegExpError("instagram");
        return;
      }
    }
    if(linkedIn){
      if(!linkedInRegex.test(linkedIn)) {
        setRegExpError("linkedIn");
        return;
      }
    }
  }


  async function handleSaveMedia() {
    const token = localStorage.getItem("token");
    if (token) {
      mediaCheck();
      if( regExpError ) return;
      const media = {
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
        linkedIn: linkedIn
      }
      await newApi.updateMedia(token, media);
    }
  }

  async function handleChangePassword() {
    const token = localStorage.getItem("token");
    if (newPassword.length < 8) {
      setNewPassError("Пароль должен быть не меньше 8 символов");
      return
    }
    if (!beginWithoutDigit.test(newPassword)) {
      setNewPassError("Пароль должен начинаться с буквы");
      return
    }
    if (!withoutSpecialChars.test(newPassword)) {
      setNewPassError("Пароль не должен содержать специальных символов");
      return
    }
    if (!containsLetters.test(newPassword)) {
      setNewPassError("Пароль должен содержать хотя бы одну букву");
      return
    }
    if (!withoutSpaces.test(newPassword)) {
      setNewPassError("Пароль не должен содержать пробелов");
      return
    }
    if (newPassword === oldPassword) {
      setNewPassError("Новый пароль не должен совпадать с старым");
      return
    }
    if (token) {
      const response = await newApi.checkPassword(token, oldPassword);
      if (response.status === 200) {
        if (newPassword === newPasswordAgain && !newPassError) {
          await newApi.changePassword(token, newPassword);
        } else {
          setNewPassError("Пароли не совпадают");
        }
      } else {
        setError("Неверный пароль");
      }
    }
  }
  return (
    <>
      <Modal
        title="Настройки"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Button type="dashed" danger onClick={handleOk}>
            <p className="tracking-widest">Вернуться</p>
          </Button>
        }
      >
        <div className="flex flex-col gap-[10px]">
          <h1
            className={
              "text-xl font-semibold mb-[10px]" +
              (theme ? " text-white" : " text-[#282846]")
            }
          >
            Смена пароля
          </h1>
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
            placeholder="Введите старый пароль"
            onChange={(e) => {
              setOldPassword(e.target.value);
              setError("");
            }}
            status={error ? "error" : ""}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          {error && <p className=" text-xs font-semibold text-red-500">{error}</p>}
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
            placeholder="Введите новый пароль"
            onChange={(e) => {
              setNewPassword(e.target.value);
              setNewPassError("");
            }}
            status={newPassError ? "error" : ""}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
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
            placeholder="Повторите новый пароль"
            status={newPassError ? "error" : ""}
            onChange={(e) => {
              setNewPasswordAgain(e.target.value);
              setNewPassError("");
            }}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          {newPassError && (
            <p
              className="text-xs font-semibold text-red-500"
            >
              {newPassError}
            </p>
          )}
          {error && (
            <p
              className={
                "text-xs font-semibold " +
                (theme ? " text-white" : " text-[#282846]")
              }
            >
              {error}
            </p>
          )}
          <Button
            type="primary"
            style={{
              backgroundColor: "#29A19C",
              width: "120px",
              height: "30px",
              marginBottom: "30px",
            }}
            onClick={() => handleChangePassword()}
          >
            Подтвердить
          </Button>
        </div>
        <div>
          <h1
            className={
              "text-xl font-semibold mb-[10px]" +
              (theme ? " text-white" : " text-[#282846]")
            }
          >
            Медиа
          </h1>
          <h1
            className={
              "text-md font-semibold " +
              (theme ? " text-white" : " text-[#282846]")
            }
          >
            Facebook
          </h1>
          <Input
            style={{ width: "310px", marginBottom: "10px" }}
            placeholder="https://www.facebook.com/ваша_страница"
            onChange={(e) => {
              setFacebook(e.target.value);
            }}
            status={regExpError === "facebook" ? "error" : ""}
          ></Input>
          {regExpError === "facebook" && (
            <p className="text-xs font-semibold text-red-500">Неверный формат ссылки</p>
          )}
          <h1
            className={
              "text-md font-semibold " +
              (theme ? " text-white" : " text-[#282846]")
            }
          >
            Twitter
          </h1>
          <Input
            style={{ width: "310px", marginBottom: "10px" }}
            placeholder="https://twitter.com/ваша_страница"
            onChange={(e) => {
              setTwitter(e.target.value);
            }}  
            status={regExpError === "twitter" ? "error" : ""}
          ></Input>
          {regExpError === "twitter" && (
            <p className="text-xs font-semibold text-red-500">Неверный формат ссылки</p>
          )}
          <h1
            className={
              "text-md font-semibold " +
              (theme ? " text-white" : " text-[#282846]")
            }
          >
            Instagram
          </h1>
          <Input
            style={{ width: "310px", marginBottom: "10px" }}
            placeholder="https://www.instagram.com/ваша_страница"
            onChange={(e) => {
              setInstagram(e.target.value);
            }}
            status={regExpError === "instagram" ? "error" : ""}
          ></Input>
          {regExpError === "instagram" && (
            <p className="text-xs font-semibold text-red-500">Неверный формат ссылки</p>
          )}
          <h1
            className={
              "text-md font-semibold " +
              (theme ? " text-white" : " text-[#282846]")
            }
          >
            LinkedIn
          </h1>
          <Input
            style={{ width: "310px", marginBottom: "10px" }}
            placeholder="https://fr.linkedin.com/ваша_страница"
            onChange={(e) => {
              setLinkedIn(e.target.value);
            }}
            status={regExpError === "linkedin" ? "error" : ""}
          ></Input>
          {regExpError === "linkedin" && (
            <p className="text-xs font-semibold text-red-500">Неверный формат ссылки</p>
          )}
          <br />
          <Button
            type="primary"
            style={{
              backgroundColor: "#29A19C",
              width: "120px",
              height: "30px",
              marginBottom: "30px",
            }}
            onClick={() => handleSaveMedia()}
          >
            Сохранить
          </Button>
          <br />
          <Button
            type="dashed"
            danger
            style={{ width: "120px", height: "30px" }}
            onClick={() => setIsModalOpenDelete(true)}
          >
            Удалить аккаунт
          </Button>
        </div>
      </Modal>
      <Modal
        title="Вы уверены?"
        open={isModalOpenDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        style={{ marginTop: "260px" }}
        footer={
          <>
            <Button type="dashed" danger onClick={handleCancelDelete}>
              <p className="tracking-widest">Вернуться</p>
            </Button>
            <Button
              type="primary"
              onClick={handleOkDelete}
              style={{ backgroundColor: "#29A19C" }}
            >
              Принять
            </Button>
          </>
        }
      ></Modal>
    </>
  );
};

export default SettingsModal;
