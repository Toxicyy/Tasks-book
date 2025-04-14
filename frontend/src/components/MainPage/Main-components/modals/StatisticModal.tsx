import { useSelector } from "react-redux";
import { AppState } from "../../../../store";
import { FC } from "react";
import { Button, Modal } from "antd";

type Props = {
  isModalOpenStatistic: boolean;
  handleCancel: () => void;
  handleOk: () => void;
};

const StatisticModal: FC<Props> = ({ isModalOpenStatistic, handleCancel, handleOk }) => {
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  const statistic = useSelector((state: AppState) => state.statisticOfWeek);

  function statisticSum() {
    let TotalTasks = 0;
    let TotalCompleted = 0;
    let TotalDeleted = 0;
    let TotalEdited = 0;
    for (let i = 0; i < 7; i++) {
      TotalTasks += statistic.weekStatistic[i].tasks;
      TotalCompleted += statistic.weekStatistic[i].completed;
      TotalDeleted += statistic.weekStatistic[i].deleted;
      TotalEdited += statistic.weekStatistic[i].edited;
    }
    return [TotalTasks, TotalCompleted, TotalDeleted, TotalEdited];
  }

  return (
    <>
      <Modal
        title="Статистика"
        open={isModalOpenStatistic}
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
        ]}
      >
        <table className="w-full text-center border-collapse border-[3px] border-[#29A19C] mb-[20px] mt-[20px]">
          <tr className={theme ? "dark" : ""}>
            <td>Задачи</td>
            <td>Создано</td>
            <td>Завершено</td>
            <td>Удалено</td>
            <td>Изменено</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Понедельник</td>
            <td>{statistic.weekStatistic[0].tasks}</td>
            <td>{statistic.weekStatistic[0].completed}</td>
            <td>{statistic.weekStatistic[0].deleted}</td>
            <td>{statistic.weekStatistic[0].edited}</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Вторник</td>
            <td>{statistic.weekStatistic[1].tasks}</td>
            <td>{statistic.weekStatistic[1].completed}</td>
            <td>{statistic.weekStatistic[1].deleted}</td>
            <td>{statistic.weekStatistic[1].edited}</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Среда</td>
            <td>{statistic.weekStatistic[2].tasks}</td>
            <td>{statistic.weekStatistic[2].completed}</td>
            <td>{statistic.weekStatistic[2].deleted}</td>
            <td>{statistic.weekStatistic[2].edited}</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Четверг</td>
            <td>{statistic.weekStatistic[3].tasks}</td>
            <td>{statistic.weekStatistic[3].completed}</td>
            <td>{statistic.weekStatistic[3].deleted}</td>
            <td>{statistic.weekStatistic[3].edited}</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Пятница</td>
            <td>{statistic.weekStatistic[4].tasks}</td>
            <td>{statistic.weekStatistic[4].completed}</td>
            <td>{statistic.weekStatistic[4].deleted}</td>
            <td>{statistic.weekStatistic[4].edited}</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Суббота</td>
            <td>{statistic.weekStatistic[5].tasks}</td>
            <td>{statistic.weekStatistic[5].completed}</td>
            <td>{statistic.weekStatistic[5].deleted}</td>
            <td>{statistic.weekStatistic[5].edited}</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Воскресенье</td>
            <td>{statistic.weekStatistic[6].tasks}</td>
            <td>{statistic.weekStatistic[6].completed}</td>
            <td>{statistic.weekStatistic[6].deleted}</td>
            <td>{statistic.weekStatistic[6].edited}</td>
          </tr>
        </table>
        <h1 className="font-semibold text-xl text-[#29A19C] mb-[10px]">Итог</h1>
        <h1
          className={
            "mb-[10px] text-lg font-semibold " +
            (theme ? " text-white" : " text-black")
          }
        >
          - Общее количество -{" "}
          <span className="text-[#29A19C]">{statisticSum()[0]}</span> задачи за
          неделю
        </h1>
        <h1
          className={
            "mb-[10px] text-lg font-semibold " +
            (theme ? " text-white" : " text-black")
          }
        >
          - Завершено{" "}
          <span className="text-[#29A19C]">{statisticSum()[1]}</span> задач
        </h1>
        <h1
          className={
            "mb-[10px] text-lg font-semibold " +
            (theme ? " text-white" : " text-black")
          }
        >
          - Удалено <span className="text-[#29A19C]">{statisticSum()[2]}</span>{" "}
          задач
        </h1>
        <h1
          className={
            "mb-[10px] text-lg font-semibold " +
            (theme ? " text-white" : " text-black")
          }
        >
          - Изменено <span className="text-[#29A19C]">{statisticSum()[3]}</span>{" "}
          задач
        </h1>
      </Modal>
    </>
  );
};

export default StatisticModal;