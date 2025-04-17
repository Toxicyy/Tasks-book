import { Button, ConfigProvider, Input, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../store";
import AddTodo from "../../../images//mainPage/header/AddTodo.png";
import WhiteTheme from "../../../images/mainPage/header/WhiteTheme.png";
import BlackTheme from "../../../images/mainPage/header/BlackTheme.png";
import Anonym from "../../../images/mainPage/header/Anonym.jpg";
import { useEffect, useState } from "react";
import { closeModal, openModal } from "../../../state/AddTodoModal.slice";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import Settings from "../../../images/mainPage/header/Settings.png";
import Premium from "../../../images/mainPage/header/Premium.png";
import UserImage from "../../../images/mainPage/header/User.png";
import logOutImage from "../../../images/mainPage/LogOut.png";
import { Link, useNavigate } from "react-router-dom";
import { toggleNightMode } from "../../../state/NightMode.slice";

import LogOutNight from "../../../images/DarkTheme/mainPage/LogOutNight.png";
import SettingsNight from "../../../images/DarkTheme/mainPage/header/SettingsNight.png";
import UserImageNight from "../../../images/DarkTheme/mainPage/header/UserNight.png";
import NightThemeWhite from "../../../images/mainPage/header/NightThemeWhite.png";
import { closeDropdown, openDropdown } from "../../../state/Dropdown.slice";
import PremiumModal from "../../PremiumPage/PremiumModal";
import SettingsModal from "../../SettingsPage/SettingsModal";
import { useAddTodoMutation} from "../../../state/todoListApi.slice";
import { useGetUserQuery } from "../../../state/userApi.slice";
import { updateTodo } from "../../../state/forceUpdate.slice";
import { useGetTaskStatisticQuery, useUpdateTaskStatisticMutation } from "../../../state/taskStatisticApi.slice";
import { useGetCategoriesQuery } from "../../../state/categoriesApi.slice";

export default function Header() {
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  const {data: categoryData, isSuccess} = useGetCategoriesQuery();
  const modalState = useSelector((state: AppState) => state.addTodoModal);
  const dispatch = useDispatch<AppDispatch>();
  const [category, setCategory] = useState("Дом");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const isDropDown = useSelector((state: AppState) => state.dropdown.isOpen);
  const [isModalPremiumOpen, setIsModalPremiumOpen] = useState(false);
  const [isModalSettingsOpen, setIsModalSettingsOpen] = useState(false);
  const [addTodoMutation, {}] = useAddTodoMutation();
  const {data: currentUser} = useGetUserQuery();
  const [updateTasks, {}] = useUpdateTaskStatisticMutation();
  const {data: taskStat} = useGetTaskStatisticQuery();
  const taskStatistic = taskStat?.statistic

  function handleSettingsOk() {
    setIsModalSettingsOpen(false);
  }

  function handleSettingsCancel() {
    setIsModalSettingsOpen(false);
  }

  function handlePremiumOk() {
    setIsModalPremiumOpen(false);
  }

  function handlePremiumCancel() {
    setIsModalPremiumOpen(false);
  }
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const showModal = () => {
    dispatch(openModal());
  };

  const handleOk = (e: any) => {
    e.preventDefault();
    const todo = {
      title: title,
      completed: false,
      category: category,
    }
    addTodoMutation(todo);
    if(taskStatistic){
      updateTasks({statistic: { ...taskStatistic, tasks: taskStatistic.tasks + 1 }});
    }
    dispatch(closeModal());
    dispatch(updateTodo())
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
            Хорошего дня, {currentUser?.user.username}
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
            onClick={() =>
              isDropDown ? dispatch(closeDropdown()) : dispatch(openDropdown())
            }
          >
            <DownOutlined style={{ color: "#29A19C" }} />
          </div>
        </div>
      </div>
      {isDropDown && (
        <div
          className={
            "relative flex justify-end transition-opacity duration-500 " +
            (isDropDown ? "opacity-100" : "opacity-0")
          }
        >
          <div className="absolute mt-0 w-48 bg-white shadow-lg rounded-lg z-50">
            <ul
              className={
                "py-2 rounded-lg " + (theme ? " bg-[#2C3440]" : "bg-white")
              }
              onClick={() => dispatch(closeDropdown())}
            >
              <Link to={"/profile"}>
                <li
                  className={
                    "px-4 py-2 cursor-pointer flex items-center gap-[10px]" +
                    (theme ? " hover:bg-[#3A4554]" : " hover:bg-gray-100")
                  }
                >
                  <img
                    className="w-[17px] h-[17px]"
                    src={theme ? UserImageNight : UserImage}
                    alt=""
                  />
                  <h1
                    className={
                      "duration-500 " +
                      (theme ? " text-white" : " text-[#282846]")
                    }
                  >
                    Личный кабинет
                  </h1>
                </li>
              </Link>
              <li
                className={
                  "flex px-4 py-2 cursor-pointer items-center gap-[10px]" +
                  (theme ? " hover:bg-[#3A4554]" : " hover:bg-gray-100")
                }
                onClick={() => {
                  dispatch(toggleNightMode()) 
                }}
              >
                <img
                  className="w-[15px] h-[15px]"
                  src={theme ? NightThemeWhite : WhiteTheme}
                  alt=""
                />
                <h1
                  className={
                    "duration-500 " +
                    (theme ? " text-white" : " text-[#282846]")
                  }
                >
                  Темный режим
                </h1>
              </li>
              <li
                className={
                  "flex px-4 py-2 cursor-pointer items-center gap-[10px]" +
                  (theme ? " hover:bg-[#3A4554]" : " hover:bg-gray-100")
                }
                onClick={() => setIsModalSettingsOpen(true)}
              >
                <img
                  className="w-[17px] h-[17px]"
                  src={theme ? SettingsNight : Settings}
                  alt=""
                />
                <h1
                  className={
                    "duration-500 " +
                    (theme ? " text-white" : " text-[#282846]")
                  }
                >
                  Настройки
                </h1>
              </li>
              <li
                className={
                  "flex px-4 py-2 cursor-pointer items-center gap-[10px]" +
                  (theme ? " hover:bg-[#3A4554]" : " hover:bg-gray-100")
                }
                onClick={() => setIsModalPremiumOpen(true)}
              >
                <img className="w-[17px] h-[17px]" src={Premium} alt="" />
                <h1 className="text-[#29A19C]">Премиум</h1>
              </li>
              <li
                className={
                  "flex px-4 py-2 cursor-pointer items-center gap-[10px]" +
                  (theme ? " hover:bg-[#3A4554]" : " hover:bg-gray-100")
                }
                onClick={() => logOut()}
              >
                <img
                  className="w-[17px] h-[17px]"
                  src={theme ? LogOutNight : logOutImage}
                  alt=""
                />
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
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              footerBg: theme ? "#2C3440" : "#FFFFFF",
              headerBg: theme ? "#2C3440" : "#FFFFFF",
              contentBg: theme ? "#2C3440" : "#FFFFFF",
              titleColor: "#29A19C",
              titleFontSize: 20,
            },
            Select: {
              colorText: theme ? "#29A19C" : "#282846",
              optionSelectedColor: theme ? "#29A19C" : "black",
              selectorBg: theme ? "#2C3440" : "#FFFFFF",
              activeBorderColor: theme ? "#29A19C" : "#282846",
              hoverBorderColor: theme ? "#29A19C" : "#282846",
              colorBorder: theme ? "#29A19C" : "#282846",
            },
          },
        }}
      >
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
                htmlType="button"
                onClick={(e) => handleOk(e)}
              >
                Добавить
              </Button>
            </div>,
          ]}
        >
          <h1 className="text-xl text-[#29A19C] font-bold pb-[20px]">
            Добавление задачи
          </h1>
          <h1
            className={
              "text-sm font-bold pb-[10px] " +
              (theme ? " text-white" : " text-[#282846]")
            }
          >
            Что нужно сделать
          </h1>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            style={
              theme
                ? {
                    background: "#222831",
                    border: "1px solid #29A19C",
                    color: "#29A19C",
                    marginBottom: "20px",
                  }
                : { background: "#FAFAFA", marginBottom: "20px" }
            }
            className={theme ? "custom-input-login" : ""}
          ></Input>
          <h1
            className={
              "text-sm font-bold pb-[10px] " +
              (theme ? " text-white" : " text-[#282846]")
            }
          >
            Категория
          </h1>
          <Select
            dropdownStyle={{ background: theme ? "#222831" : "#FAFAFA" }}
            defaultValue={categoryData?.categories[0].title}
            style={{ width: 200, marginBottom: "20px" }}
            onChange={handleChange}
            options={categoryData?.categories.map((category) => ({
              value: category.title,
              label: category.title,
            }))}
          ></Select>
        </Modal>
        <PremiumModal
          isModalOpen={isModalPremiumOpen}
          handleOk={handlePremiumOk}
          handleCancel={handlePremiumCancel}
        />
        <SettingsModal
          isModalOpen={isModalSettingsOpen}
          handleOk={handleSettingsOk}
          handleCancel={handleSettingsCancel}
        />
      </ConfigProvider>
      {theme ? (
        <style>
          {`
          /* Стили для рамки Select */
          .custom-select .ant-select-selector {
            border-color: #29A19C !important;
          }

          /* Стили для подсветки выбранного option */
          .ant-select-item-option-active {
            background-color: #3A4554 !important; /* Более мягкий цвет */
          }

          /* Цвет текста в выпадающем списке */
          .ant-select-item {
            color: #29A19C !important;
          }

          /* Цвет текста выбранного элемента */
          .ant-select-selection-item {
            color: #29A19C !important;
          }
        `}
        </style>
      ) : (
        ""
      )}
    </div>
  );
}
