import { useDispatch, useSelector } from "react-redux";
import Todo from "./Todo";
import { AppDispatch, AppState } from "../../../store";
import { useGetTodosQuery } from "../../../state/todoListApi.slice";
import { useEffect, useState } from "react";
import { updateTodo } from "../../../state/forceUpdate.slice";
import { useGetCategoriesQuery } from "../../../state/categoriesApi.slice";
import { Category } from "../../../types/category";

export default function TodoList() {
  const {data: todoList, refetch} = useGetTodosQuery()
  const todoUpdate = useSelector((state: AppState) => state.forceUpdate.todoUpdate);
  const {data: category, isSuccess} = useGetCategoriesQuery();
  const dispatch = useDispatch<AppDispatch>();
  const [currentCategory, setCurrentCategory] = useState<Category>({ id: 0, src: "", nightSrc: "", title: "", isActive: false, isInitial: false });

  const theme = useSelector((state: AppState) => state.nightMode.mode);

  useEffect(() => {
    if (todoUpdate) {
      dispatch(updateTodo());
      refetch();
    }
  }, [todoUpdate]);

  useEffect(() => {
    if (isSuccess) {
      setCurrentCategory(category?.categories.find((item) => item.isActive)!)
    }
  }, [category]);

  return (
    <div className={"w-[55vw] shadow-xl duration-500 rounded-xl p-[20px] flex flex-col gap-[20px] mb-[30px] xl:w-[36.3vw] " + (theme ? " bg-[#2C3440]" : "bg-[#FFFFFF]")}>
      <div className="">
        <h1 className="font-semibold text-xl text-[#29A19C] mb-[20px]">
          Активные задачи
        </h1>
        <div className="flex flex-col gap-[10px]">
          {todoList ? todoList?.todos
            .filter((todo) => !todo.completed)
            .filter((todo) => todo.category === currentCategory?.title)
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
            .filter((todo) => todo.category === currentCategory?.title)
            .map((todo) => (
              <Todo id={todo.id} title={todo.title} key={todo.id} />
            )) : null}
        </div>
      </div>
    </div>
  );
}
