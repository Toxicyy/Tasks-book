import { Button, Modal } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";

type Props = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const PremiumModal: FC<Props> = ({ isModalOpen, handleOk, handleCancel }) => {
    const theme =  useSelector((state: AppState) => state.nightMode.mode);
  return (
    <>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={
          <Button
            type="primary"
            style={{
              backgroundColor: "#29A19C",
              width: "300px",
              height: "40px",
            }}
            onClick={handleOk}
          >
            {" "}
            <p className="tracking-wider text-md font-semibold">
              Неплохое предложение, не так ли?
            </p>
          </Button>
        }
      >
        <h1 className={"font-semibold text-2xl mb-[10px] " + (theme ? " text-white" : " text-[#282846]")}>
          Что же даст вам <span className="text-[#29A19C]">премиум</span>?
        </h1>
        <h2 className={"font-semibold mb-[5px] text-lg" + (theme ? " text-white" : " text-[#282846]")}>
          1. Доступ к <span className="text-[#29A19C]">премиум-функциям</span>.
        </h2>
        <p className={"ml-[25px] mb-[5px] text-lg" + (theme ? " text-white" : " text-[#282846]")}>
          - Число задач увеличивается с{" "}
          <span className="text-[#29A19C]">10 до 20</span> в день.
        </p>
        <p className={"ml-[25px] mb-[5px] text-lg" + (theme ? " text-white" : " text-[#282846]")}>
          - Вы можете создавать столько{" "}
          <span className="text-[#29A19C]">категорий</span>, сколько вам
          потребуется.
        </p>
        <p className={"ml-[25px] mb-[5px] text-lg" + (theme ? " text-white" : " text-[#282846]")}>
          - Статистика будет сохраняться не на 7 дней, а на целый{" "}
          <span className="text-[#29A19C]">месяц</span>.
        </p>
        <p className={"ml-[25px] mb-[5px] text-lg" + (theme ? " text-white" : " text-[#282846]")}>
          - По ходу развития проекта{" "}
          <span className="text-[#29A19C]">премиум-функций</span> станет больше.
        </p>
        <h2 className={"ml-[25px] mb-[5px] text-lg" + (theme ? " text-white" : " text-[#282846]")}>
          2. Доступ к <span className="text-[#29A19C]">бета-тесту</span> других
          проектов.
        </h2>
        <h2 className={"font-semibold mb-[5px] text-lg" + (theme ? " text-white" : " text-[#282846]")}>
          3. <span className="text-[#29A19C]">Премиум-подписка</span>{" "}
          распространяется на все проекты разработчика
        </h2>
        <p className={"ml-[25px] mb-[5px] text-lg" + (theme ? " text-white" : " text-[#282846]")}>
          - Стоимость которой <span className="text-[#29A19C]">всего</span>{" "}
          $4.99/месяц
        </p>
      </Modal>
    </>
  );
};

export default PremiumModal;
