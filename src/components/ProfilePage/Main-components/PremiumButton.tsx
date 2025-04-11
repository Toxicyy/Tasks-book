import { Button, ConfigProvider } from "antd";
import PremiumModal from "../../PremiumPage/PremiumModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";

export default function PremiumButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useSelector((state: AppState) => state.nightMode.mode);

  function handleOk(){
    setIsModalOpen(false);
  }
  function handleCancel(){
    setIsModalOpen(false);
  }
  return (
    <>
      <Button
        type="primary"
        style={{
          backgroundColor: "#ECCA75",
          width: "100%",
          height: "45px",
          zIndex: 10,
          position: "relative",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <p className="text-[18px] tracking-widest">Оформить премиум подписку</p>
      </Button>
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
      <PremiumModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
      </ConfigProvider>
    </>
  );
}
