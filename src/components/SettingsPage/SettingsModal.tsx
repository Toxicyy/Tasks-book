import { Button, Input, Modal } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

type Props = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const SettingsModal: FC<Props> = ({ isModalOpen, handleOk, handleCancel }) => {
    const theme = useSelector((state: AppState) => state.nightMode.mode);
  return (
    <>
      <Modal
        title="Настройки"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Button type="primary" style={{ backgroundColor: "#29A19C", width: "120px", height: "30px" }} onClick={handleOk}>
            <p className="tracking-widest">Save </p>
          </Button>
        }
      >
        <div className="flex flex-col gap-[10px]">
          <h1 className={"text-xl font-semibold mb-[10px]" + (theme ? " text-white" : " text-[#282846]")}>Смена пароля</h1>
          <Input.Password
              className="custom-input-login"
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
              placeholder="Введите старый пароль"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <Input.Password
              className="custom-input-login"
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
              placeholder="Введите новый пароль"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          <Input.Password
              className="custom-input-login"
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
              placeholder="Повторите новый пароль"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
        </div>
      </Modal>
    </>
  );
};

export default SettingsModal;
