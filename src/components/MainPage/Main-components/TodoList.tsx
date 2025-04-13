import { useSelector } from "react-redux";
import Todo from "./Todo";
import { AppState } from "../../../store";
import { useGetTodosQuery } from "../../../state/todoListApi.slice";

export default function TodoList() {
  const {data: todoList, isLoading, isError} = useGetTodosQuery()
  const tabs = useSelector((state: AppState) => state.tabs);
  const currentTab = tabs.find((tab) => tab.isActive);

  const theme = useSelector((state: AppState) => state.nightMode.mode);

  return (
    <div className={"w-[36.3vw] shadow-xl duration-500 rounded-xl p-[20px] flex flex-col gap-[20px] mb-[30px] " + (theme ? " bg-[#2C3440]" : "bg-[#FFFFFF]")}>
      <div className="">
        <h1 className="font-semibold text-xl text-[#29A19C] mb-[20px]">
          Активные задачи
        </h1>
        <div className="flex flex-col gap-[10px]">
          {todoList?.todos
            .filter((todo) => !todo.completed)
            .filter((todo) => todo.category === currentTab?.title)
            .map((todo) => (
              <Todo id={todo.id} title={todo.title} key={todo.id} />
            ))}
        </div>
      </div>
      <div>
        <h1 className="font-semibold text-xl text-[#29A19C] mb-[20px]">
          Завершенные задачи
        </h1>
        <div className="flex flex-col gap-[10px]">
          {todoList?.todos
            .filter((todo) => todo.completed)
            .filter((todo) => todo.category === currentTab?.title)
            .map((todo) => (
              <Todo id={todo.id} title={todo.title} key={todo.id} />
            ))}
        </div>
      </div>
    </div>
  );
}
