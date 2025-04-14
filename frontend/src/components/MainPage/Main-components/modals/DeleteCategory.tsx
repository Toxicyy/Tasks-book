import { Button, Modal } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../store";

type Props = {
    isModalOpenDelete: boolean;
    handleOk: () => void;
    handleCancel: () => void;
};

const DeleteCategory:FC<Props> = ({ isModalOpenDelete, handleOk, handleCancel }) => {
    const theme = useSelector((state: AppState) => state.nightMode.mode);
  return (
    <>
      <Modal
        title="Вы уверены что хотите удалить категорию?"
        open={isModalOpenDelete}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            type={theme ? "primary" : "default"}
            style={theme ? { backgroundColor: "#e24a4a" } : {}}
            key="back"
            onClick={handleCancel}
          >
            Вернуться
          </Button>,
          <Button
            style={{ backgroundColor: "#29A19C" }}
            key="submit"
            type="primary"
            onClick={handleOk}
          >
            Подтвердить
          </Button>,
        ]}
      ></Modal>
    </>
  );
};

export default DeleteCategory;
