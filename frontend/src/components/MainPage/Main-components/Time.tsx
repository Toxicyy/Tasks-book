import { useState, useEffect } from "react";
import TimeImage from "../../../images/mainPage/mainSec/Time.png"
import DateImage from "../../../images/mainPage/mainSec/Date.png"
import { CarryOutOutlined } from "@ant-design/icons";
import { AppState } from "../../../store";
import { useSelector } from "react-redux";
import TimeNight from "../../../images/DarkTheme/mainPage/mainSec/TimeNight.png"
import DateNight from "../../../images/DarkTheme/mainPage/mainSec/DateNight.png"

export default function Time() {
    const [time, setTime] = useState(new Date());
    const [date, setDate] = useState('');
    const [day, setDay] = useState('');
    const theme = useSelector((state: AppState) => state.nightMode.mode);

    useEffect(() => {
        const updateTime = () => {
            setTime(new Date());
        };
        const intervalId = setInterval(updateTime, 1000);
        const today = new Date();
        const options:Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        setDate(today.toLocaleDateString('ru-RU', options));
        setDay(today.toLocaleDateString('ru-RU', { weekday: 'long' }));

        return () => clearInterval(intervalId);
    }, []);

    const renderTime = () => {
        return time.toLocaleTimeString('ru-Ru');
    };

    return (
        <div className={"w-[55vw] min-w-[227px] shadow-xl rounded-xl p-[20px] flex flex-col duration-500 gap-[20px] xl:w-[37.4vw] " + (theme ? " bg-[#2C3440]" : "bg-[#FFFFFF]")}>
            <h1 className="font-semibold text-2xl text-[#29A19C]">Такс такс такс</h1>
            <div className="flex justify-between flex-wrap">
                <div className="">
                    <h1 className={theme ? "text-white duration-500" : "text-[#282846] duration-500"}>На часах у нас</h1>
                    <div className="flex items-center gap-[12px]">
                        <img className="w-[25px] h-[25px] duration-500 mb-[-4px]" src={theme ? TimeNight : TimeImage} alt="" />
                        <h1 className={"font-semibold duration-500 text-[#282846] text-[25px]" + (theme ? " text-white" : "")} >{renderTime()}</h1>
                    </div>
                </div>
                <div className="">
                    <h1 className={theme ? "text-white duration-500" : "text-[#282846] duration-500"}>А сегодня у нас</h1>
                    <div className="flex items-center gap-[12px]">
                        <img className="w-[25px] h-[25px] duration-500" src={theme ? DateNight : DateImage} alt="" />
                        <h1 className={"font-semibold duration-500 text-[#282846] text-[25px]" + (theme ? " text-white" : "")}>{date}</h1>
                    </div>
                </div>
                <div className="">
                    <h1 className={theme ? "text-white duration-500" : "text-[#282846] duration-500"}>День недели</h1>
                    <div className="flex items-center gap-[12px] duration-500">
                        <CarryOutOutlined style={{ color: theme ? "#FAFAFA" : "#282846", fontSize: "25px" }} />
                        <h1 className={"font-semibold duration-500 text-[#282846] text-[25px]" + (theme ? " text-white" : "")}>{day.charAt(0).toUpperCase() + day.slice(1)}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
