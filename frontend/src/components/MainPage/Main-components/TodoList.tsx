import { useDispatch, useSelector } from "react-redux";
import Todo from "./Todo";
import { AppDispatch, AppState } from "../../../store";
import { useGetTodosQuery } from "../../../state/todoListApi.slice";
import { useEffect } from "react";
import { updateTodo } from "../../../state/forceUpdate.slice";

export default function TodoList() {
  const {data: todoList, refetch} = useGetTodosQuery()
  const todoUpdate = useSelector((state: AppState) => state.forceUpdate.todoUpdate);
  const tabs = useSelector((state: AppState) => state.tabs);
  const currentTab = tabs.find((tab) => tab.isActive);
  const dispatch = useDispatch<AppDispatch>();

  const theme = useSelector((state: AppState) => state.nightMode.mode);

  useEffect(() => {
    if (todoUpdate) {
      dispatch(updateTodo());
      refetch();
    }
  }, [todoUpdate]);

  return (
    <div className={"w-[36.3vw] shadow-xl duration-500 rounded-xl p-[20px] flex flex-col gap-[20px] mb-[30px] " + (theme ? " bg-[#2C3440]" : "bg-[#FFFFFF]")}>
      <div className="">
        <h1 className="font-semibold text-xl text-[#29A19C] mb-[20px]">
          Активные задачи
        </h1>
        <div className="flex flex-col gap-[10px]">
          {todoList ? todoList?.todos
            .filter((todo) => !todo.completed)
            .filter((todo) => todo.category === currentTab?.title)
            .map((todo) => (
              <Todo id={todo.id} title={todo.title} key={todo.id} />
            )) : null}
        </div>
      </div>
      <div>
        <h1 className="font-semibold text-xl text-[#29A19C] mb-[20px]">
          Завершенные задачи
        </h1>
        <div className="flex flex-col gap-[10px]">
          {todoList ? todoList?.todos
            .filter((todo) => todo.completed)
            .filter((todo) => todo.category === currentTab?.title)
            .map((todo) => (
              <Todo id={todo.id} title={todo.title} key={todo.id} />
            )) : null}
        </div>
      </div>
    </div>
  );
}
