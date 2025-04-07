import { Button, Input, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../store";
import AddTodo from "../../../images/AddTodo.png";
import WhiteTheme from "../../../images/WhiteTheme.png";
import BlackTheme from "../../../images/BlackTheme.png";
import Anonym from "../../../images/Anonym.jpg";
import { useState } from "react";
import { addTodo } from "../../../state/TodoList.slice";
import { addTask } from "../../../state/TaskStatistic.slice";
import { closeModal, openModal } from "../../../state/AddTodoModal.slice";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import Settings from "../../../images/Settings.png";
import Premium from "../../../images/Premium.png";
import UserImage from "../../../images/User.png";
import logOutImage from "../../../images/LogOut.png";
import { useNavigate } from "react-router-dom";
import { toggleNightMode } from "../../../state/NightMode.slice";

import LogOutNight from "../../../images/LogOutNight.png";
import SettingsNight from "../../../images/SettingsNight.png";
import UserImageNight from "../../../images/UserNight.png";
import NightThemeWhite from "../../../images/NightThemeWhite.png";

export default function Header() {
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  const currentUser = useSelector((state: AppState) => state.userSlice);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const tabs = useSelector((state: AppState) => state.tabs);
  const todo = useSelector((state: AppState) => state.todoList);
  const modalState = useSelector((state: AppState) => state.addTodoModal);
  const dispatch = useDispatch<AppDispatch>();
  const [category, setCategory] = useState("Дом");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const showModal = () => {
    dispatch(openModal());
  };

  const handleOk = () => {
    dispatch(
      addTodo({
        title: title,
        category: category,
        completed: false,
        id: todo.todos.length + 1,
      })
    );
    dispatch(addTask());
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };
  const handleChange = (value: string) => {
    setCategory(value);
  };
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <Button
          type="primary"
          style={{ width: "186px", height: "42px", background: "#29A19C" }}
          onClick={showModal}
        >
          <img className="w-[20px] h-[20px]" src={AddTodo} alt="" />
          <h1 className="text-base font-semibold">Новая задача</h1>
        </Button>
        <img
          className="w-[27px] h-[27px] duration-500"
          src={theme ? BlackTheme : WhiteTheme}
          alt=""
        />

        <div className="flex items-center gap-[20px] select-none">
          <h1
            className={
              "font-semibold text-base duration-500 text-[#282846] " +
              (theme ? "text-white" : " ")
            }
          >
            Хорошего дня, {currentUser?.name}
          </h1>
          <img
            className="w-[45px] h-[45px] rounded-4xl"
            src={Anonym}
            alt="Avatar"
          />
          <div
            className={
              "w-[24px] h-[24px] duration-500 flex items-center justify-center shadow-xl cursor-pointer " +
              (theme ? "bg-[#2C3440]" : "bg-[#FFFFFF]")
            }
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <DownOutlined style={{ color: "#29A19C" }} />
          </div>
        </div>
      </div>
      {isDropdownOpen && (
        <div
          className={
            "flex justify-end transition-opacity duration-500 " +
            (isDropdownOpen ? "opacity-100" : "opacity-0")
          }
        >
          <div className="absolute mt-0 w-48 bg-white shadow-lg rounded-lg">
            <ul
              className={
                "py-2 rounded-lg " + (theme ? " bg-[#2C3440]" : "bg-white")
              }
              onClick={() => setDropdownOpen(false)}
            >
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-[10px]">
                <img className="w-[17px] h-[17px]" src={theme ? UserImageNight : UserImage} alt="" />
                <h1
                  className={
                    "duration-500 " +
                    (theme ? " text-white" : " text-[#282846]")
                  }
                >
                  Личный кабинет
                </h1>
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-[10px]"
                onClick={() => dispatch(toggleNightMode())}
              >
                <img className="w-[15px] h-[15px]" src={theme ? NightThemeWhite : WhiteTheme} alt="" />
                <h1
                  className={
                    "duration-500 " +
                    (theme ? " text-white" : " text-[#282846]")
                  }
                >
                  Темный режим
                </h1>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-[10px]">
                <img className="w-[17px] h-[17px]" src={theme ? SettingsNight : Settings} alt="" />
                <h1
                  className={
                    "duration-500 " +
                    (theme ? " text-white" : " text-[#282846]")
                  }
                >
                  Настройки
                </h1>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-[10px]">
                <img className="w-[17px] h-[17px]" src={Premium} alt="" />
                <h1 className="text-[#29A19C] text-">Премиум</h1>
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-[10px]"
                onClick={() => logOut()}
              >
                <img className="w-[17px] h-[17px]" src={theme ? LogOutNight : logOutImage} alt="" />
                <h1
                  className={
                    "duration-500 " +
                    (theme ? " text-white" : " text-[#282846]")
                  }
                >
                  Выйти
                </h1>
              </li>
            </ul>
          </div>
        </div>
      )}
      <Modal
        title=""
        open={modalState.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="flex justify-between">
            <Button
              style={{ width: "126px", height: "42px" }}
              danger
              type="primary"
              onClick={handleCancel}
            >
              Отменить
            </Button>
            <Button
              style={{
                backgroundColor: "#29A19C",
                width: "126px",
                height: "42px",
              }}
              type="primary"
              onClick={handleOk}
            >
              Добавить
            </Button>
          </div>,
        ]}
      >
        <h1 className="text-xl text-[#29A19C] font-bold pb-[20px]">
          Добавление задачи
        </h1>
        <h1 className="text-sm font-bold pb-[10px]">Что нужно сделать</h1>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: "20px" }}
        ></Input>
        <h1 className="text-sm font-bold pb-[10px]">Категория</h1>
        <Select
          defaultValue={tabs[0].title}
          style={{ width: 200, marginBottom: "20px" }}
          onChange={handleChange}
          options={tabs.map((tab) => ({ value: tab.title, label: tab.title }))}
        ></Select>
      </Modal>
    </div>
  );
}
