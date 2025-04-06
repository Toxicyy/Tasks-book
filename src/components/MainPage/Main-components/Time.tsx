import { FieldTimeOutlined, CalendarOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import TimeImage from "../../../images/Time.png"
import DateImage from "../../../images/Date.png"
import DayImage from "../../../images/Day.png"

export default function Time() {
    const [time, setTime] = useState(new Date());
    const [date, setDate] = useState('');
    const [day, setDay] = useState('');

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
        <div className="w-[36.3vw] bg-[#FFFFFF] shadow-xl rounded-xl p-[20px] flex flex-col gap-[20px]">
            <h1 className="font-semibold text-2xl text-[#29A19C]">Такс такс такс</h1>
            <div className="flex justify-between flex-wrap">
                <div className="">
                    <h1 className="text-[#282846]">На часах у нас</h1>
                    <div className="flex items-center gap-[12px]">
                        <img className="w-[25px] h-[25px] mb-[-4px]" src={TimeImage} alt="" />
                        <h1 className="font-semibold text-[#282846] text-[25px]">{renderTime()}</h1>
                    </div>
                </div>
                <div className="">
                    <h1 className="text-[#282846]">А сегодня у нас</h1>
                    <div className="flex items-center gap-[12px]">
                        <img className="w-[25px] h-[25px]" src={DateImage} alt="" />
                        <h1 className="font-semibold text-[#282846] text-[25px]">{date}</h1>
                    </div>
                </div>
                <div className="">
                    <h1 className="text-[#282846]">День недели</h1>
                    <div className="flex items-center gap-[12px]">
                        <img className="w-[25px] h-[25px] mb-[-3px]" src={DayImage} alt="" />
                        <h1 className="font-semibold text-[#282846] text-[25px]">{day.charAt(0).toUpperCase() + day.slice(1)}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
