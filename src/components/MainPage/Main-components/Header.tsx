import { Button, Input, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../store";
import AddTodo from "../../../images/AddTodo.png";
import WhiteTheme from "../../../images/WhiteTheme.png";
import BlackTheme from "../../../images/BlackTheme.png";
import Anonym from "../../../images/Anonym.jpg";
import { useState } from "react";
import { addTodo } from "../../../state/TodoList.slice";
import { addTask } from "../../../state/TaskStatistic.slice";
import { closeModal, openModal } from "../../../state/AddTodoModal.slice";

export default function Header() {
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  const currentUser = useSelector((state: AppState) => state.userSlice);
  const tabs = useSelector((state: AppState) => state.tabs);
  const todo = useSelector((state: AppState) => state.todoList);
  const modalState = useSelector((state: AppState) => state.addTodoModal);
  const dispatch = useDispatch<AppDispatch>();
  const [category, setCategory] = useState("Дом");
  const [title, setTitle] = useState("");

  const showModal = () => {
    dispatch(openModal())
  };

  const handleOk = () => {
    dispatch(
      addTodo({
        title: title,
        category: category,
        completed: false,
        id: todo.todos.length + 1,
      })
    );
    dispatch(addTask());
    dispatch(closeModal())
  };

  const handleCancel = () => {
    dispatch(closeModal())
  };
  const handleChange = (value: string) => {
    setCategory(value);
  };
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <Button
          type="primary"
          style={{ width: "186px", height: "42px", background: "#29A19C" }}
          onClick={showModal}
        >
          <img className="w-[20px] h-[20px]" src={AddTodo} alt="" />
          <h1 className="text-base font-semibold">Новая задача</h1>
        </Button>
        <img
          className="w-[27px] h-[27px]"
          src={theme ? BlackTheme : WhiteTheme}
          alt=""
        />

        <div className="flex items-center gap-[10px]">
          <h1 className="font-semibold text-base">
            Хорошего дня, {currentUser?.name}
          </h1>
          <img
            className="w-[45px] h-[45px] rounded-4xl"
            src={Anonym}
            alt="Avatar"
          />
        </div>
      </div>
      <Modal
        title=""
        open={modalState.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
            <div className="flex justify-between">
                <Button style={{ width: "126px", height: "42px"}} danger type="primary" onClick={handleCancel}>Отменить</Button>
                <Button style={{backgroundColor: "#29A19C", width: "126px", height: "42px"}} type="primary" onClick={handleOk}>Добавить</Button>
            </div>
        ]}
      >
        <h1 className="text-xl text-[#29A19C] font-bold pb-[20px]">Добавление задачи</h1>
        <h1 className="text-sm font-bold pb-[10px]">Что нужно сделать</h1>
        <Input onChange={(e) => setTitle(e.target.value)} style={{ marginBottom: "20px" }}></Input>
        <h1 className="text-sm font-bold pb-[10px]">Категория</h1>
        <Select
          defaultValue={tabs[0].title}
          style={{ width: 200, marginBottom: "20px" }}
          onChange={handleChange}
          options={tabs.map((tab) => ({ value: tab.title, label: tab.title }))}
        ></Select>
      </Modal>
    </div>
  );
}