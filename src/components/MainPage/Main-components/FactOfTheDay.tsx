import { useEffect, useState } from "react";
import { api } from "../../../shared/api";

export default function FactOfTheDay() {
    const [fact, setFact] = useState<string>("");
  useEffect(() => {
    const today = new Date();
    const day = today.getDay() +1;
    async function getFactOfTheDay(){
        const response = await api.factOfTheDay.getFactOfTheDay();
        setFact(response[day].text);
    }
    getFactOfTheDay();
  }, []);

  

  return (
    <div className="w-[36.3vw] bg-[#FFFFFF] shadow-xl rounded-xl p-[20px]">
      <h1 className="font-semibold text-2xl text-[#29A19C] mb-[20px]">Факт дня</h1>
      <p>{fact}</p>
    </div>
  );
}
