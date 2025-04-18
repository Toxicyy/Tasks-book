import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import Graphic from "./Graphic";

export default function Graph() {
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  return (
    <div className={"w-[55vw] shadow-xl duration-500 rounded-xl p-[20px] flex flex-col gap-[20px] xl:w-[37.4vw] " + (theme ? " bg-[#2C3440]" : "bg-[#FFFFFF]")}>
      <h1 className="font-semibold text-2xl text-[#29A19C] mb-[20px]">
        График успеваемости
      </h1>
      <Graphic theme={theme} />
    </div>
  );
}
