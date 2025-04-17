import { useSelector } from "react-redux";
import logo from "../../images/mainPage/header/logo.png";
import { AppState } from "../../store";
import { ConfigProvider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import AddCategory from "./Main-components/modals/AddCategory";
import Add from "../../images/mainPage/aside/Add.png";
import Compare from "../../images/mainPage/aside/Compare.png";
import Statistic from "../../images/mainPage/aside/Statistic.png";
import LogOut from "../../images/mainPage/LogOut.png";
import { useNavigate } from "react-router-dom";
import StatisticNight from "../../images/DarkTheme/mainPage/aside/StatisticNight.png";
import CompareNight from "../../images/DarkTheme/mainPage/aside/CompareNight.png";
import LogOutNight from "../../images/DarkTheme/mainPage/LogOutNight.png";
import CompareModal from "./Main-components/modals/CompareModal";
import StatisticModal from "./Main-components/modals/StatisticModal";
import DeleteCategory from "./Main-components/modals/DeleteCategory";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useInitialCategoriesMutation,
  useMakeCategoryActiveMutation,
  useUpdateCategoryMutation,
} from "../../state/categoriesApi.slice";
import { Category } from "../../types/category";
import House from "../../images/mainPage/aside/House.png";
import Family from "../../images/mainPage/aside/Family.png";
import Work from "../../images/mainPage/aside/Work.png";
import Sport from "../../images/mainPage/aside/Sport.png";
import HouseNight from "../../images/DarkTheme/mainPage/aside/HouseNight.png";
import FamilyNight from "../../images/DarkTheme/mainPage/aside/FamilyNight.png";
import WorkNight from "../../images/DarkTheme/mainPage/aside/WorkNight.png";
import SportNight from "../../images/DarkTheme/mainPage/aside/SportNight.png";

export default function Aside() {
  const { data: tabs, isSuccess, refetch } = useGetCategoriesQuery();
  const [activeCategory] = useMakeCategoryActiveMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [initialCategories] = useInitialCategoriesMutation();
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenStatistic, setIsModalOpenStatistic] = useState(false);
  const [isModalOpenCompare, setIsModalOpenCompare] = useState(false);
  const [newTabTitle, setNewTabTitle] = useState("");
  const [error, setError] = useState("");
  const [deleteTabId, setDeleteTabId] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    if (tabs?.categories.length === 0) {
      initialCategories([
        {
          id: 1,
          src: "House",
          nightSrc: "HouseNight",
          title: "Дом",
          isActive: true,
          isInitial: true,
        },
        {
          id: 2,
          src: "Work",
          nightSrc: "WorkNight",
          title: "Работа",
          isActive: false,
          isInitial: true,
        },
        {
          id: 3,
          src: "Family",
          nightSrc: "FamilyNight",
          title: "Семья",
          isActive: false,
          isInitial: true,
        },
        {
          id: 4,
          src: "Sport",
          nightSrc: "SportNight",
          title: "Спорт",
          isActive: false,
          isInitial: true,
        },
      ]);
      refetch();
    }
    activeCategory(1);
    refetch();
  }, [isSuccess]);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  type GetSrcFunction = (tab: Category) => string;
  const getSrc: GetSrcFunction = (tab) => {
    if (theme) {
      switch (tab.nightSrc) {
        case "HouseNight":
          return HouseNight;
        case "WorkNight":
          return WorkNight;
        case "FamilyNight":
          return FamilyNight;
        case "SportNight":
          return SportNight;
        default:
          return HouseNight;
      }
    } else {
      switch (tab.src) {
        case "House":
          return House;
        case "Work":
          return Work;
        case "Family":
          return Family;
        case "Sport":
          return Sport;
        default:
          return House;
      }
    }
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
      deleteCategory(deleteTabId);
      refetch();
    } else if (task === "add") {
      if (newTabTitle === "") {
        setError("Поле не должно быть пустым");
        return;
      }
      setIsModalOpen(false);
      if (tabs) {
        updateCategory({
          id: tabs.categories.length + 1,
          title: newTabTitle,
          src: "House",
          nightSrc: "HouseNight",
          isActive: false,
          isInitial: false,
        });
        refetch();
      }
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
            {tabs && isSuccess
              ? tabs.categories.map((tab) => (
                  <div
                    className="flex items-center justify-between cursor-pointer "
                    key={tab.id}
                    onClick={() =>{
                      if(!tab.isActive){
                        activeCategory(tab.id);
                        refetch();
                      }
                    }
                    }
                  >
                    <div className="flex items-center gap-[10px]">
                      <img
                        className="w-[17px] duration-500 h-[17px]"
                        src={getSrc(tab)}
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
                    {tab.isActive && (
                      <div className="rounded-l-2xl bg-[#29A19C] w-[30px] h-[18px] flex items-center justify-center text-white">
                        {" "}
                        {!tab.isInitial ? (
                          <DeleteOutlined
                            style={{ width: "13px", height: "13px" }}
                            onClick={() => {
                              setDeleteTabId(tab.id);
                              showModal("delete");
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </div>
                ))
              : null}
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
        <AddCategory
          isModalOpen={isModalOpen}
          handleOk={() => handleOk("add")}
          handleCancel={() => handleCancel("add")}
          error={error}
          setError={setError}
          setNewTabTitle={setNewTabTitle}
        />
        <DeleteCategory
          isModalOpenDelete={isModalOpenDelete}
          handleOk={() => handleOk("delete")}
          handleCancel={() => handleCancel("delete")}
        />
        <StatisticModal
          isModalOpenStatistic={isModalOpenStatistic}
          handleCancel={() => handleCancel("statistic")}
          handleOk={() => handleOk("statistic")}
        />
        <CompareModal
          isModalOpenCompare={isModalOpenCompare}
          handleCancel={() => handleCancel("compare")}
        />
      </ConfigProvider>
    </div>
  );
}
