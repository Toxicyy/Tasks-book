import { useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import { AppDispatch, AppState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { toggleTodo } from "../../../state/TodoList.slice";
import classNames from "classnames";

export default function Todo({ id, title }: { id: number; title: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const todoList = useSelector((state: AppState) =>
    state.todoList.todos.find((t) => t.id === id)
  );

  const [isHover, setIsHover] = useState(false);

  // Устанавливаем checked на основе состояния todo
  const checked = todoList ? todoList.completed : false;

  const handleToggle = () => {
    dispatch(toggleTodo(id));
  };

  return (
    <div
      className="w-full border border-[rgba(40,40,70,0.2)] p-4 flex gap-2 items-center rounded-xl"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && (
        <div
          className="w-5 h-5 rounded-sm border-[#29A19C] border-2 flex justify-center items-center transition-all duration-300 ease-in-out cursor-pointer"
          onClick={handleToggle}
        >
          {checked && (
            <CheckOutlined
              style={{ color: "#29A19C", width: "13px", height: "11px" }}
            />
          )}
        </div>
      )}
      <h1
        className={classNames("transition-all duration-300 ease-in-out", {
          "line-through": checked,
        })}
      >
        {title}
      </h1>
    </div>
  );
}
