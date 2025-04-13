import { useState } from "react";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AppDispatch, AppState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  editTodo,
  toggleTodo,
} from "../../../state/TodoList.slice";
import { Button, ConfigProvider, Input, Modal } from "antd";
import {
  deleteTask,
  doneTask,
  editTask,
} from "../../../state/TaskStatistic.slice";
import { useGetTodosQuery } from "../../../state/todoListApi.slice";

export default function Todo({ id, title }: { id: number; title: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const {data: todoList, isLoading, isError} = useGetTodosQuery()
  const todo = todoList?.todos.find((todo) => todo.id === id);

  const [isHover, setIsHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const checked = todo ? todo.completed : false;
  const theme = useSelector((state: AppState) => state.nightMode.mode);

  const handleToggle = () => {
    dispatch(toggleTodo(id));
    if (!todo?.completed) {
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
      className={
        "w-full border duration-500 p-[15px] flex justify-between items-center rounded-xl " +
        (theme
          ? "border-[rgba(249,249,249,0.2)]"
          : "border-[rgba(40,40,70,0.2)]")
      }
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
          className={
            "duration-500 text-md " +
            (theme ? " text-white" : " text-[#282846]") +
            (checked ? " line-through" : "")
          }
        >
          {title}
        </h1>
      </div>
      {isHover && (
        <div className="flex gap-[10px] items-center">
          <EditOutlined
            style={{ color: theme ? "#FFFFFF" : "#282846" }}
            className="cursor-pointer"
            onClick={showModal}
          />
          <DeleteOutlined
            style={{ color: "#e24a4a" }}
            className="cursor-pointer"
            onClick={showModalDelete}
          />
        </div>
      )}
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              footerBg: theme ? "#2C3440" : "#FFFFFF",
              headerBg: theme ? "#2C3440" : "#FFFFFF",
              contentBg: theme ? "#2C3440" : "#FFFFFF",
              titleColor: "#29A19C",
              titleFontSize: 20,
            },
            Select: {
              colorText: theme ? "#29A19C" : "#282846",
              optionSelectedColor: theme ? "#29A19C" : "black",
              selectorBg: theme ? "#2C3440" : "#FFFFFF",
              activeBorderColor: theme ? "#29A19C" : "#282846",
              hoverBorderColor: theme ? "#29A19C" : "#282846",
              colorBorder: theme ? "#29A19C" : "#282846",
            },
          },
        }}
      >
        <Modal
          title="Изменение задачи"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={
            <div>
              <Button type="primary" className="mr-[10px]" danger onClick={handleCancel}><p className="tracking-widest">Вернуться</p></Button>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#29A19C",
                  width: "120px",
                  height: "30px",
                }}
                onClick={handleOk}
              >
                <p className="tracking-widest">Сохранить </p>
              </Button>
            </div>
          }
        >
          <Input
            className="custom-input-login dark-mode-autofill"
            style={
              theme
                ? {
                    width: "310px",
                    background: "#222831",
                    border: "1px solid #29A19C",
                    color: "#29A19C",
                  }
                : { width: "310px", background: "#FAFAFA" }
            }
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
          ></Input>
        </Modal>
        <Modal
          title="Вы уверены что хотите удалить?"
          open={isModalDeleteOpen}
          onOk={handleOkDelete}
          onCancel={handleCancelDelete}
          footer={
            <div>
              <Button type="primary" className="mr-[10px]" danger onClick={handleCancel}><p className="tracking-widest">Вернуться</p></Button>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#29A19C",
                  width: "120px",
                  height: "30px",
                }}
                onClick={handleOk}
              >
                <p className="tracking-widest">Сохранить </p>
              </Button>
            </div>
          }
        ></Modal>
      </ConfigProvider>
    </div>
  );
}
