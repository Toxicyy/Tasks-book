import { useSelector } from "react-redux";
import StatCircle from "./StatCircle";
import { AppState } from "../../../store";

export default function Stats() {
  const stats = useSelector((state: AppState) => state.taskStatistic);
  return (
    <div className="w-[36.3vw] bg-[#FFFFFF] shadow-xl rounded-xl p-[20px]">
      <h1 className="font-semibold text-xl text-[#29A19C] mb-[20px]">Успехи за неделю</h1>
      <div className="flex justify-between flex-wrap">
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <h1 className="font-semibold text-sm text-[#282846]">Создано</h1>
          <StatCircle value={stats.taskTotal} />
        </div>
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <h1 className="font-semibold text-sm text-[#282846]">Завершено</h1>
          <StatCircle value={stats.taskDone} />
        </div>
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <h1 className="font-semibold text-sm text-[#282846]">Удалено</h1>
          <StatCircle value={stats.taskDeleted} />
        </div>
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <h1 className="font-semibold text-sm text-[#282846]">Изменено</h1>
          <StatCircle value={stats.taskEdited} />
        </div>
      </div>
    </div>
  );
}
