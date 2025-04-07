import { useDispatch, useSelector } from "react-redux";
import logo from "../../images/logo.png";
import { AppDispatch, AppState } from "../../store";
import {
  addTab,
  makeTabActive,
  removeTab,
  tabHover,
} from "../../state/Tabs.slice";
import { Button, Input, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import House from "../../images/house.png";
import Add from "../../images/Add.png";
import Compare from "../../images/Compare.png";
import Statistic from "../../images/Statistic.png";
import LogOut from "../../images/LogOut.png";
import { addTask } from "../../state/TaskStatistic.slice";
import { useNavigate } from "react-router-dom";
import StatisticNight from "../../images/StatisticNight.png";
import CompareNight from "../../images/CompareNight.png";
import LogOutNight from "../../images/LogOutNight.png";

export default function Aside() {
  const tabs = useSelector((state: AppState) => state.tabs);
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [newTabTitle, setNewTabTitle] = useState("");
  const [error, setError] = useState("");
  const [deleteTabId, setDeleteTabId] = useState(-1);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (newTabTitle === "") {
      setError("Поле не должно быть пустым");
      return;
    }
    setIsModalOpen(false);
    dispatch(
      addTab({
        title: newTabTitle,
        src: House,
        id: tabs.length + 1,
        isHover: false,
        isActive: false,
        isInitial: false,
      })
    );
    dispatch(addTask());
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalDelete = () => {
    setIsModalOpenDelete(true);
  };

  const handleOkDelete = () => {
    setIsModalOpenDelete(false);
    dispatch(removeTab(deleteTabId));
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
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
                          showModalDelete();
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
              onClick={() => showModal()}
            >
              <img src={Add} alt="" className="w-[17px] h-[17px]" />
              <h1 className="text-base text-[#29A19C] font-normal">Добавить</h1>
            </button>
          </div>

          <div className="flex flex-col gap-[30px]">
            <h1 className="text-2xl text-[#29A19C] font-semibold mb-[-10px]">
              Данные
            </h1>
            <div className="flex items-center gap-[10px] cursor-pointer">
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
            <div className="flex items-center gap-[10px] cursor-pointer">
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

      <Modal
        title="Добавить новую категорию"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        styles={{
          body: theme ? { backgroundColor: "#222831" } : { backgroundColor: "#FAFAFA" }
        }}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Вернуться
          </Button>,
          <Button
            style={{ backgroundColor: "#29A19C" }}
            key="submit"
            type="primary"
            onClick={handleOk}
          >
            Подтвердить
          </Button>,
        ]}
      >
        <Input
          onChange={(e) => {
            setNewTabTitle(e.target.value);
            setError("");
          }}
          placeholder="Название категории до 20 символов"
          onInput={(e: any) => (e.target.value = e.target.value.slice(0, 20))}
          status={error ? "error" : ""}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </Modal>
      <Modal
        title="Вы уверены что хотите удалить категорию?"
        open={isModalOpenDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        footer={[
          <Button key="back" onClick={handleCancelDelete}>
            Вернуться
          </Button>,
          <Button
            style={{ backgroundColor: "#29A19C" }}
            key="submit"
            type="primary"
            onClick={handleOkDelete}
          >
            Подтвердить
          </Button>,
        ]}
      ></Modal>
    </div>
  );
}
