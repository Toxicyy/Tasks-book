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
      TotalTasks += statistic.weekStatistic[i].taskTotal;
      TotalCompleted += statistic.weekStatistic[i].taskDone;
      TotalDeleted += statistic.weekStatistic[i].taskDeleted;
      TotalEdited += statistic.weekStatistic[i].taskEdited;
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
            <td>{statistic.weekStatistic[0].taskTotal}</td>
            <td>{statistic.weekStatistic[0].taskDone}</td>
            <td>{statistic.weekStatistic[0].taskDeleted}</td>
            <td>{statistic.weekStatistic[0].taskEdited}</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Вторник</td>
            <td>{statistic.weekStatistic[1].taskTotal}</td>
            <td>{statistic.weekStatistic[1].taskDone}</td>
            <td>{statistic.weekStatistic[1].taskDeleted}</td>
            <td>{statistic.weekStatistic[1].taskEdited}</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Среда</td>
            <td>{statistic.weekStatistic[2].taskTotal}</td>
            <td>{statistic.weekStatistic[2].taskDone}</td>
            <td>{statistic.weekStatistic[2].taskDeleted}</td>
            <td>{statistic.weekStatistic[2].taskEdited}</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Четверг</td>
            <td>{statistic.weekStatistic[3].taskTotal}</td>
            <td>{statistic.weekStatistic[3].taskDone}</td>
            <td>{statistic.weekStatistic[3].taskDeleted}</td>
            <td>{statistic.weekStatistic[3].taskEdited}</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Пятница</td>
            <td>{statistic.weekStatistic[4].taskTotal}</td>
            <td>{statistic.weekStatistic[4].taskDone}</td>
            <td>{statistic.weekStatistic[4].taskDeleted}</td>
            <td>{statistic.weekStatistic[4].taskEdited}</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Суббота</td>
            <td>{statistic.weekStatistic[5].taskTotal}</td>
            <td>{statistic.weekStatistic[5].taskDone}</td>
            <td>{statistic.weekStatistic[5].taskDeleted}</td>
            <td>{statistic.weekStatistic[5].taskEdited}</td>
          </tr>
          <tr className={theme ? "dark" : ""}>
            <td>Воскресенье</td>
            <td>{statistic.weekStatistic[6].taskTotal}</td>
            <td>{statistic.weekStatistic[6].taskDone}</td>
            <td>{statistic.weekStatistic[6].taskDeleted}</td>
            <td>{statistic.weekStatistic[6].taskEdited}</td>
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