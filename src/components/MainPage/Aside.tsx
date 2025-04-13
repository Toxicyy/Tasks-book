import { useDispatch, useSelector } from "react-redux";
import logo from "../../images/mainPage/header/logo.png";
import { AppDispatch, AppState } from "../../store";
import {
  addTab,
  makeTabActive,
  removeTab,
  tabHover,
} from "../../state/Tabs.slice";
import { ConfigProvider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import House from "../../images/mainPage/aside/House.png";
import HouseNight from "../../images/DarkTheme/mainPage/aside/HouseNight.png";
import Add from "../../images/mainPage/aside/Add.png";
import Compare from "../../images/mainPage/aside/Compare.png";
import Statistic from "../../images/mainPage/aside/Statistic.png";
import LogOut from "../../images/mainPage/LogOut.png";
import { useNavigate } from "react-router-dom";
import StatisticNight from "../../images/DarkTheme/mainPage/aside/StatisticNight.png"
import CompareNight from "../../images/DarkTheme/mainPage/aside/CompareNight.png";
import LogOutNight from "../../images/DarkTheme/mainPage/LogOutNight.png";
import CompareModal from "./Main-components/modals/CompareModal";
import StatisticModal from "./Main-components/modals/StatisticModal";
import AddCategory from "./Main-components/modals/AddCategory";
import DeleteCategory from "./Main-components/modals/DeleteCategory";

export default function Aside() {
  const tabs = useSelector((state: AppState) => state.tabs);
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenStatistic, setIsModalOpenStatistic] = useState(false);
  const [isModalOpenCompare, setIsModalOpenCompare] = useState(false);
  const [newTabTitle, setNewTabTitle] = useState("");
  const [error, setError] = useState("");
  const [deleteTabId, setDeleteTabId] = useState(-1);
  const navigate = useNavigate();
  const statistic = useSelector((state: AppState) => state.statisticOfWeek);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const showModal = (task: "add" | "delete" | "statistic" | "compare") => {
    if (task === "delete") {
      setIsModalOpenDelete(true);
    } else if (task === "add") {
      setIsModalOpen(true);
    } else if (task === "statistic") {
      setIsModalOpenStatistic(true);
    } else if (task === "compare") {
      setIsModalOpenCompare(true);
    }
  };

  const handleOk = (task: "add" | "delete" | "statistic" | "compare") => {
    if (task === "delete") {
      setIsModalOpenDelete(false);
      dispatch(removeTab(deleteTabId));
    } else if (task === "add") {
      if (newTabTitle === "") {
        setError("Поле не должно быть пустым");
        return;
      }
      setIsModalOpen(false);
      dispatch(
        addTab({
          title: newTabTitle,
          src: House,
          nightSrc: HouseNight,
          id: tabs.length + 1,
          isHover: false,
          isActive: false,
          isInitial: false,
        })
      );
    } else if (task === "statistic") {
      setIsModalOpenStatistic(false);
    } else if (task === "compare") {
      setIsModalOpenCompare(false);
    }
  };

  const handleCancel = (task: "add" | "delete" | "statistic" | "compare") => {
    if (task === "delete") {
      setIsModalOpenDelete(false);
    } else if (task === "add") {
      setIsModalOpen(false);
    } else if (task === "statistic") {
      setIsModalOpenStatistic(false);
    } else if (task === "compare") {
      setIsModalOpenCompare(false);
    }
  };

  return (
    <div
      className={
        "fixed pt-[20px] pl-[20px] h-[100vh] flex flex-col justify-between duration-500 w-[14.07vw] z-40 shadow-right " +
        (theme ? " bg-[#2C3440]" : " bg-[#FAFAFA]")
      }
    >
      <div className="flex flex-col gap-[60px]">
        <div className="flex gap-[10px]">
          <img className="w-[55px] h-[55px]" src={logo} alt="logo" />
          <h1 className="font-montserrat font-semibold text-lg/[23px] text-[#29A19C] flex items-center">
            Tasks <br /> Book
          </h1>
        </div>
        <div className="flex flex-col gap-[60px]">
          <div className="flex flex-col gap-[30px]">
            <h1 className="text-2xl text-[#29A19C] font-semibold mb-[-10px]">
              Категории
            </h1>
            {tabs.map((tab) => (
              <div
                className="flex items-center justify-between cursor-pointer "
                key={tab.id}
                onMouseEnter={() => {
                  dispatch(tabHover({ id: tab.id - 1, ishover: true }));
                }}
                onMouseLeave={() => {
                  dispatch(tabHover({ id: tab.id - 1, ishover: false }));
                }}
                onClick={() => dispatch(makeTabActive({ id: tab.id - 1 }))}
              >
                <div className="flex items-center gap-[10px]">
                  <img
                    className="w-[17px] duration-500 h-[17px]"
                    src={theme ? tab?.nightSrc : tab?.src}
                    alt=""
                  />
                  <h1
                    className={
                      "text-base duration-500 text-[#282846] font-normal " +
                      (theme ? " text-[#F9F9F9]" : " ")
                    }
                  >
                    {tab.title}
                  </h1>
                </div>
                {(tab.isHover || tab.isActive) && (
                  <div className="rounded-l-2xl bg-[#29A19C] w-[30px] h-[18px] flex items-center justify-center text-white">
                    {" "}
                    {!tab.isInitial ? (
                      <DeleteOutlined
                        style={{ width: "13px", height: "13px" }}
                        onClick={() => {
                          setDeleteTabId(tab.id - 1);
                          showModal("delete");
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            ))}
            <button
              className="cursor-pointer flex items-center gap-[10px]"
              onClick={() => showModal("add")}
            >
              <img src={Add} alt="" className="w-[17px] h-[17px]" />
              <h1 className="text-base text-[#29A19C] font-normal">Добавить</h1>
            </button>
          </div>

          <div className="flex flex-col gap-[30px]">
            <h1 className="text-2xl text-[#29A19C] font-semibold mb-[-10px]">
              Данные
            </h1>
            <div
              className="flex items-center gap-[10px] cursor-pointer"
              onClick={() => showModal("statistic")}
            >
              <img
                className="w-[17px] duration-500 h-[17px]"
                src={theme ? StatisticNight : Statistic}
                alt=""
              />
              <h1
                className={
                  "text-base duration-500 font-normal " +
                  (theme ? " text-[#F9F9F9]" : " text-[#282846]")
                }
              >
                Статистика
              </h1>
            </div>
            <div
              className="flex items-center gap-[10px] cursor-pointer"
              onClick={() => showModal("compare")}
            >
              <img
                className="w-[17px] h-[17px] duration-500"
                src={theme ? CompareNight : Compare}
                alt=""
              />
              <h1
                className={
                  "text-base font-normal duration-500 " +
                  (theme ? " text-[#F9F9F9]" : " text-[#282846]")
                }
              >
                Сравнить
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="items-end ">
        <div
          className="flex gap-[10px] items-center cursor-pointer pb-[15px]"
          onClick={() => logOut()}
        >
          <img
            className="w-[17px] h-[17px] duration-500"
            src={theme ? LogOutNight : LogOut}
            alt=""
          />
          <h1
            className={
              "text-base font-normal duration-500 " +
              (theme ? " text-[#F9F9F9]" : " text-[#282846]")
            }
          >
            Выйти
          </h1>
        </div>
      </div>
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
            Input: {},
          },
        }}
      >
        <AddCategory isModalOpen={isModalOpen} handleOk={() => handleOk("add")} handleCancel={() => handleCancel("add")} error={error} setError={setError} setNewTabTitle={setNewTabTitle} />
        <DeleteCategory isModalOpenDelete={isModalOpenDelete} handleOk={() => handleOk("delete")} handleCancel={() => handleCancel("delete")} />
        <StatisticModal isModalOpenStatistic={isModalOpenStatistic} handleCancel={() => handleCancel("statistic")} handleOk={() => handleOk("statistic")} />
        <CompareModal isModalOpenCompare={isModalOpenCompare} handleCancel={() => handleCancel("compare")} />
      </ConfigProvider>
    </div>
  );
}