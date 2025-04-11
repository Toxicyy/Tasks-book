import { Button, Input, Modal } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../store";

type Props = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  error: string;
  setError: (value: string) => void;
  setNewTabTitle: (value: string) => void;
};

const AddCategory: FC<Props> = ({ isModalOpen, handleOk, handleCancel, error, setError, setNewTabTitle }) => {
    const theme = useSelector((state: AppState) => state.nightMode.mode);
  return (
    <>
      <Modal
        title="Добавить новую категорию"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            type={theme ? "primary" : "default"}
            key="back"
            style={theme ? { backgroundColor: "#e24a4a" } : {}}
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
      >
        <Input
          onChange={(e) => {
            setNewTabTitle(e.target.value);
            setError("");
          }}
          placeholder="Название категории до 20 символов"
          onInput={(e: any) => (e.target.value = e.target.value.slice(0, 20))}
          status={error ? "error" : ""}
          style={
            theme
              ? {
                  background: "#222831",
                  border: "1px solid #29A19C",
                  color: "#29A19C",
                }
              : { background: "#FAFAFA" }
          }
          className={theme ? "custom-input-login" : ""}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </Modal>
    </>
  );
};

export default AddCategory;
