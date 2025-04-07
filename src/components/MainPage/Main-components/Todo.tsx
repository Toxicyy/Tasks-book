import { useState } from "react";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AppDispatch, AppState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, editTodo, toggleTodo } from "../../../state/TodoList.slice";
import classNames from "classnames";
import { Input, Modal } from "antd";
import { deleteTask, doneTask, editTask } from "../../../state/TaskStatistic.slice";

export default function Todo({ id, title }: { id: number; title: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const todo = useSelector((state: AppState) =>
    state.todoList.todos.find((t) => t.id === id)
  );
  const [isHover, setIsHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const checked = todo ? todo.completed : false;
  const theme = useSelector((state: AppState) => state.nightMode.mode);

  const handleToggle = () => {
    dispatch(toggleTodo(id));
    if(!todo?.completed){
      dispatch(doneTask());
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(editTodo({ id, title: newTitle }));
    dispatch(editTask());
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalDelete = () => {
    setIsModalDeleteOpen(true);
  };

  const handleOkDelete = () => {
    dispatch(deleteTodo(id));
    dispatch(deleteTask());
    setIsModalDeleteOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalDeleteOpen(false);
  };

  return (
    <div
      className={"w-full border duration-500 p-[15px] flex justify-between items-center rounded-xl " + (theme ? "border-[rgba(249,249,249,0.2)]" : "border-[rgba(40,40,70,0.2)]")}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex gap-[10px] items-center">
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
        className={"duration-500 text-md " + (theme ? " text-white" : " text-[#282846]") + (checked ? " line-through" : "")}
      >
        {title}
      </h1>
      </div>
      {isHover && <div className="flex gap-[10px] items-center">
        <EditOutlined style={{color: theme ? "#FFFFFF" : "#282846"}} className="cursor-pointer" onClick={showModal}/>
        <DeleteOutlined style={{color: "#e24a4a"}} className="cursor-pointer" onClick={showModalDelete}/>
      </div>}
      <Modal title="Изменение задачи" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input onChange={(e) => setNewTitle(e.target.value)} value={newTitle}></Input>
      </Modal>
      <Modal title="Вы уверены что хотите удалить?" open={isModalDeleteOpen} onOk={handleOkDelete} onCancel={handleCancelDelete}>
      </Modal>
    </div>
  );
}
