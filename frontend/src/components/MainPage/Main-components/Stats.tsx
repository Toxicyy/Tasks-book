import { useSelector } from "react-redux";
import StatCircle from "./StatCircle";
import { AppState } from "../../../store";
import { useGetTaskStatisticQuery } from "../../../state/taskStatisticApi.slice";
import { useEffect } from "react";

export default function Stats() {
  const {data: stats, refetch} = useGetTaskStatisticQuery();
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  const updateTodo = useSelector((state: AppState) => state.forceUpdate.todoUpdate);

  useEffect(() => {
    refetch();
  }, [updateTodo]);
  return (
    <div className={"w-[55vw] shadow-xl rounded-xl duration-500 p-[20px] xl:w-[36.3vw] " + (theme ? " bg-[#2C3440]" : "bg-[#FFFFFF]")}>
      <h1 className="font-semibold duration-500 text-xl text-[#29A19C] mb-[20px]">Успехи за неделю</h1>
      <div className="flex justify-between flex-wrap">
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <h1 className={"font-semibold duration-500 text-sm " + (theme ? " text-white" : " text-[#282846]")}>Создано</h1>
          <StatCircle value={stats?.statistic.tasks ? stats?.statistic.tasks : 0} />
        </div>
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <h1 className={"font-semibold duration-500 text-sm " + (theme ? " text-white" : " text-[#282846]")}>Завершено</h1>
          <StatCircle value={stats?.statistic.completed ? stats?.statistic.completed : 0} />
        </div>
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <h1 className={"font-semibold duration-500 text-sm " + (theme ? " text-white" : " text-[#282846]")}>Удалено</h1>
          <StatCircle value={stats?.statistic.deleted ? stats?.statistic.deleted : 0} />
        </div>
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <h1 className={"font-semibold duration-500 text-sm " + (theme ? " text-white" : " text-[#282846]")}>Изменено</h1>
          <StatCircle value={stats?.statistic.edited ? stats?.statistic.edited : 0} />
        </div>
      </div>
    </div>
  );
}
