import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import { AppState } from "../../../../store";
import { FC } from "react";
import Graphic, { CompareData } from "../Graphic";

type Props = {
  isModalOpenCompare: boolean;
  handleCancel: (value: string) => void;
};

const CompareModal: FC<Props> = ({ isModalOpenCompare, handleCancel }) => {
  const theme = useSelector((state: AppState) => state.nightMode.mode);

  function dataSum() {
    let sum = 0;
    let sum2 = 0;
    for (let i = 0; i < 7; i++) {
      sum += CompareData[i].value1;
    }
    for (let i = 0; i < 7; i++) {
      sum2 += CompareData[i].value2;
    }
    return [sum, sum2];
  }

  function comparePercent() {
    const [sum1, sum2] = dataSum();
    return ((sum1 - sum2) / ((sum1 + sum2) / 2)) * 100;
  }

  return (
    <>
      <Modal
        title="Сравнение"
        open={isModalOpenCompare}
        onCancel={() => handleCancel("compare")}
        footer={[
          <Button
            type={theme ? "primary" : "default"}
            style={theme ? { backgroundColor: "#e24a4a" } : {}}
            key="back"
            onClick={() => handleCancel("compare")}
          >
            Вернуться
          </Button>,
        ]}
      >
        <table className="w-full text-center border-collapse border-[3px] border-[#29A19C] mb-[20px] mt-[20px]">
          <tr className={theme ? "dark" : ""}>
            <td>Количество задач</td>
            <td>Эта неделя</td>
            <td>Прошла неделя</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Понедельник</td>
            <td>{CompareData[0].value1}</td>
            <td>{CompareData[0].value2}</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Вторник</td>
            <td>{CompareData[1].value1}</td>
            <td>{CompareData[1].value2}</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Среда</td>
            <td>{CompareData[2].value1}</td>
            <td>{CompareData[2].value2}</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Четверг</td>
            <td>{CompareData[3].value1}</td>
            <td>{CompareData[3].value2}</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Пятница</td>
            <td>{CompareData[4].value1}</td>
            <td>{CompareData[4].value2}</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Суббота</td>
            <td>{CompareData[5].value1}</td>
            <td>{CompareData[5].value2}</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Воскресенье</td>
            <td>{CompareData[6].value1}</td>
            <td>{CompareData[6].value2}</td>
          </tr>
        </table>
        <Graphic theme={theme} />
        <h1 className="font-semibold text-xl text-[#29A19C] mb-[10px]">Итог</h1>
        <p
          className={
            "mb-[10px] text-lg font-semibold " +
            (theme ? " text-white" : " text-black")
          }
        >
          - Всего за прошлую неделю было выполнено{" "}
          <span className="text-[#29A19C]">{dataSum()[1]}</span> задач
        </p>
        <p
          className={
            "mb-[10px] text-lg font-semibold " +
            (theme ? " text-white" : " text-black")
          }
        >
          - Всего за эту неделю было выполнено{" "}
          <span className="text-[#29A19C]">{dataSum()[0]}</span> задач
        </p>
        <p
          className={
            "mb-[10px] text-lg font-semibold " +
            (theme ? " text-white" : " text-black")
          }
        >
          - За эту неделю вы выполнили на{" "}
          <span className="text-[#29A19C]">
            {Math.abs(comparePercent()).toFixed(2)}%
          </span>{" "}
          {comparePercent() < 0 ? "меньше" : "больше"} задач, чем за прошлую
        </p>
      </Modal>
    </>
  );
};

export default CompareModal;
