import { useSelector } from "react-redux";
import Todo from "./Todo";
import { AppState } from "../../../store";

export default function TodoList() {
  const todoList = useSelector((state: AppState) => state.todoList);
  const tabs = useSelector((state: AppState) => state.tabs);
  const currentTab = tabs.find((tab) => tab.isActive);
  console.log(currentTab)

  return (
    <div className="w-[36.3vw] bg-[#FFFFFF] shadow-xl rounded-xl p-[20px] flex flex-col gap-[20px]">
      <div className="">
        <h1 className="font-semibold text-xl text-[#29A19C] mb-[20px]">
          Активные задачи
        </h1>
        <div className="flex flex-col gap-[10px]">
          {todoList.todos
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
          {todoList.todos
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
