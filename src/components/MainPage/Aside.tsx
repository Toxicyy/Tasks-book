import { useDispatch, useSelector } from "react-redux";
import logo from "../../images/logo.png";
import { AppDispatch, AppState } from "../../store";
import {
  addTab,
  makeTabActive,
  removeTab,
  tabHover,
} from "../../state/Tabs.slice";
import { Button, ConfigProvider, Input, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import House from "../../images/house.png";
import HouseNight from "../../images/houseNight.png";
import Add from "../../images/Add.png";
import Compare from "../../images/Compare.png";
import Statistic from "../../images/Statistic.png";
import LogOut from "../../images/LogOut.png";
import { addTask } from "../../state/TaskStatistic.slice";
import { useNavigate } from "react-router-dom";
import StatisticNight from "../../images/StatisticNight.png";
import CompareNight from "../../images/CompareNight.png";
import LogOutNight from "../../images/LogOutNight.png";
import Graphic, { CompareData } from "./Main-components/Graphic";

function dataSum() {
  let sum = 0;
  let sum2 = 0;
  for (let i = 0; i < 7; i++) {
    sum += CompareData[i].value1;
  }
  for (let i = 0; i < 7; i++) {
    sum2 += CompareData[i].value2;
  }
  return [sum, sum2];
}

function comparePercent() {
  const [sum1, sum2] = dataSum();
  return ((sum1 - sum2) / ((sum1 + sum2) / 2)) * 100;
}

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

  function statisticSum() {
    let TotalTasks = 0;
    let TotalCompleted = 0;
    let TotalDeleted = 0;
    let TotalEdited = 0;
    for (let i = 0; i < 7; i++) {
      TotalTasks += statistic.weekStatistic[i].taskTotal;
      TotalCompleted += statistic.weekStatistic[i].taskDone;
      TotalDeleted += statistic.weekStatistic[i].taskDeleted;
      TotalEdited += statistic.weekStatistic[i].taskEdited;
    }
    return [TotalTasks, TotalCompleted, TotalDeleted, TotalEdited];
  }

  const logOut = () => {
    localStorage.removeItem("user");
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
      dispatch(addTask());
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
        <Modal
          title="Добавить новую категорию"
          open={isModalOpen}
          onOk={() => handleOk("add")}
          onCancel={() => handleCancel("add")}
          footer={[
            <Button
              type={theme ? "primary" : "default"}
              key="back"
              style={theme ? { backgroundColor: "#e24a4a" } : {}}
              onClick={() => handleCancel("add")}
            >
              Вернуться
            </Button>,
            <Button
              style={{ backgroundColor: "#29A19C" }}
              key="submit"
              type="primary"
              onClick={() => handleOk("add")}
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
            style={
              theme
                ? {
                    background: "#222831",
                    border: "1px solid #29A19C",
                    color: "#29A19C",
                  }
                : { background: "#FAFAFA" }
            }
            className={theme ? "custom-input-login" : ""}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </Modal>
        <Modal
          title="Вы уверены что хотите удалить категорию?"
          open={isModalOpenDelete}
          onOk={() => handleOk("delete")}
          onCancel={() => handleCancel("delete")}
          footer={[
            <Button
              type={theme ? "primary" : "default"}
              style={theme ? { backgroundColor: "#e24a4a" } : {}}
              key="back"
              onClick={() => handleCancel("delete")}
            >
              Вернуться
            </Button>,
            <Button
              style={{ backgroundColor: "#29A19C" }}
              key="submit"
              type="primary"
              onClick={() => handleOk("delete")}
            >
              Подтвердить
            </Button>,
          ]}
        ></Modal>
        <Modal
          title="Статистика"
          open={isModalOpenStatistic}
          onOk={() => handleOk("statistic")}
          onCancel={() => handleCancel("statistic")}
          footer={[
            <Button
              type={theme ? "primary" : "default"}
              style={theme ? { backgroundColor: "#e24a4a" } : {}}
              key="back"
              onClick={() => handleCancel("statistic")}
            >
              Вернуться
            </Button>,
          ]}
        >
          <table className="w-full text-center border-collapse border-[3px] border-[#29A19C] mb-[20px] mt-[20px]">
            <tr className={theme ? "dark" : ""}>
              <td>Задачи</td>
              <td>Создано</td>
              <td>Завершено</td>
              <td>Удалено</td>
              <td>Изменено</td>
            </tr>
            <tr className={theme ? "dark" : ""}>
              <td>Понедельник</td>
              <td>{statistic.weekStatistic[0].taskTotal}</td>
              <td>{statistic.weekStatistic[0].taskDone}</td>
              <td>{statistic.weekStatistic[0].taskDeleted}</td>
              <td>{statistic.weekStatistic[0].taskEdited}</td>
            </tr>
            <tr className={theme ? "dark" : ""}>
              <td>Вторник</td>
              <td>{statistic.weekStatistic[1].taskTotal}</td>
              <td>{statistic.weekStatistic[1].taskDone}</td>
              <td>{statistic.weekStatistic[1].taskDeleted}</td>
              <td>{statistic.weekStatistic[1].taskEdited}</td>
            </tr>
            <tr className={theme ? "dark" : ""}>
              <td>Среда</td>
              <td>{statistic.weekStatistic[2].taskTotal}</td>
              <td>{statistic.weekStatistic[2].taskDone}</td>
              <td>{statistic.weekStatistic[2].taskDeleted}</td>
              <td>{statistic.weekStatistic[2].taskEdited}</td>
            </tr>
            <tr className={theme ? "dark" : ""}>
              <td>Четверг</td>
              <td>{statistic.weekStatistic[3].taskTotal}</td>
              <td>{statistic.weekStatistic[3].taskDone}</td>
              <td>{statistic.weekStatistic[3].taskDeleted}</td>
              <td>{statistic.weekStatistic[3].taskEdited}</td>
            </tr>
            <tr className={theme ? "dark" : ""}>
              <td>Пятница</td>
              <td>{statistic.weekStatistic[4].taskTotal}</td>
              <td>{statistic.weekStatistic[4].taskDone}</td>
              <td>{statistic.weekStatistic[4].taskDeleted}</td>
              <td>{statistic.weekStatistic[4].taskEdited}</td>
            </tr>
            <tr className={theme ? "dark" : ""}>
              <td>Суббота</td>
              <td>{statistic.weekStatistic[5].taskTotal}</td>
              <td>{statistic.weekStatistic[5].taskDone}</td>
              <td>{statistic.weekStatistic[5].taskDeleted}</td>
              <td>{statistic.weekStatistic[5].taskEdited}</td>
            </tr>
            <tr className={theme ? "dark" : ""}>
              <td>Воскресенье</td>
              <td>{statistic.weekStatistic[6].taskTotal}</td>
              <td>{statistic.weekStatistic[6].taskDone}</td>
              <td>{statistic.weekStatistic[6].taskDeleted}</td>
              <td>{statistic.weekStatistic[6].taskEdited}</td>
            </tr>
          </table>
          <h1 className="font-semibold text-xl text-[#29A19C] mb-[10px]">
            Итог
          </h1>
          <h1
            className={
              "mb-[10px] text-lg font-semibold " +
              (theme ? " text-white" : " text-black")
            }
          >
            - Общее количество -{" "}
            <span className="text-[#29A19C]">{statisticSum()[0]}</span> задачи
            за неделю
          </h1>
          <h1
            className={
              "mb-[10px] text-lg font-semibold " +
              (theme ? " text-white" : " text-black")
            }
          >
            - Завершено{" "}
            <span className="text-[#29A19C]">{statisticSum()[1]}</span> задач
          </h1>
          <h1
            className={
              "mb-[10px] text-lg font-semibold " +
              (theme ? " text-white" : " text-black")
            }
          >
            - Удалено{" "}
            <span className="text-[#29A19C]">{statisticSum()[2]}</span> задач
          </h1>
          <h1
            className={
              "mb-[10px] text-lg font-semibold " +
              (theme ? " text-white" : " text-black")
            }
          >
            - Изменено{" "}
            <span className="text-[#29A19C]">{statisticSum()[3]}</span> задач
          </h1>
        </Modal>
        <Modal
          title="Сравнение"
          open={isModalOpenCompare}
          onCancel={() => handleCancel("compare")}
          footer={[
            <Button
              type={theme ? "primary" : "default"}
              style={theme ? { backgroundColor: "#e24a4a" } : {}}
              key="back"
              onClick={() => handleCancel("compare")}
            >
              Вернуться
            </Button>,
          ]}
        >
          <table className="w-full text-center border-collapse border-[3px] border-[#29A19C] mb-[20px] mt-[20px]">
            <tr className={theme ? "dark" : ""}>
              <td>Количество задач</td>
              <td>Эта неделя</td>
              <td>Прошла неделя</td>
            </tr>
            <tr className={theme ? "dark" : ""}>
              <td>Понедельник</td>
              <td>{CompareData[0].value1}</td>
              <td>{CompareData[0].value2}</td>
            </tr>
            <tr className={theme ? "dark" : ""}>
              <td>Вторник</td>
              <td>{CompareData[1].value1}</td>
              <td>{CompareData[1].value2}</td>
            </tr>
            <tr className={theme ? "dark" : ""}>
              <td>Среда</td>
              <td>{CompareData[2].value1}</td>
              <td>{CompareData[2].value2}</td>
            </tr>
            <tr className={theme ? "dark" : ""}>
              <td>Четверг</td>
              <td>{CompareData[3].value1}</td>
              <td>{CompareData[3].value2}</td>
            </tr>
            <tr className={theme ? "dark" : ""}>
              <td>Пятница</td>
              <td>{CompareData[4].value1}</td>
              <td>{CompareData[4].value2}</td>
            </tr>
            <tr className={theme ? "dark" : ""}>
              <td>Суббота</td>
              <td>{CompareData[5].value1}</td>
              <td>{CompareData[5].value2}</td>
            </tr>
            <tr className={theme ? "dark" : ""}>
              <td>Воскресенье</td>
              <td>{CompareData[6].value1}</td>
              <td>{CompareData[6].value2}</td>
            </tr>
          </table>
          <Graphic theme={theme} />
          <h1 className="font-semibold text-xl text-[#29A19C] mb-[10px]">
            Итог
          </h1>
          <p
            className={
              "mb-[10px] text-lg font-semibold " +
              (theme ? " text-white" : " text-black")
            }
          >
            - Всего за прошлую неделю было выполнено{" "}
            <span className="text-[#29A19C]">{dataSum()[1]}</span> задач
          </p>
          <p
            className={
              "mb-[10px] text-lg font-semibold " +
              (theme ? " text-white" : " text-black")
            }
          >
            - Всего за эту неделю было выполнено{" "}
            <span className="text-[#29A19C]">{dataSum()[0]}</span> задач
          </p>
          <p
            className={
              "mb-[10px] text-lg font-semibold " +
              (theme ? " text-white" : " text-black")
            }
          >
            - За эту неделю вы выполнили на{" "}
            <span className="text-[#29A19C]">
              {Math.abs(comparePercent()).toFixed(2)}%
            </span>{" "}
            {comparePercent() < 0 ? "меньше" : "больше"} задач, чем за прошлую
          </p>
        </Modal>
      </ConfigProvider>
    </div>
  );
}
