import { useEffect, useState } from "react";
import { newApi } from "../../../shared/api";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";

export default function FactOfTheDay() {
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  const [fact, setFact] = useState<string>("");
  useEffect(() => {
    const today = new Date();
    const day = today.getDay();
    async function getFactOfTheDay() {
      const response = await newApi.getFactOfTheDay();
      const data = await response.json();
      setFact(data.factOfTheDay[day].text);
    }
    getFactOfTheDay();
  }, []);

  return (
    <div className={"w-[36.3vw] shadow-xl duration-500 rounded-xl p-[20px] " + (theme ? " bg-[#2C3440]" : "bg-[#FFFFFF]")}>
      <h1 className="font-semibold text-2xl text-[#29A19C] mb-[20px]">
        Факт дня
      </h1>
      <p className={theme ? "text-white duration-500" : "text-black duration-500"}>{fact}</p>
    </div>
  );
}
