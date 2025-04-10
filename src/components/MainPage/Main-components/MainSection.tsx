import FactOfTheDay from "./FactOfTheDay";
import Graph from "./Graph";
import Observation from "./Observation";
import Stats from "./Stats";
import Time from "./Time";
import TodoList from "./TodoList";

export default function MainSection() {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-[30px]">
        <Stats />
        <TodoList />
      </div>
      <div className="flex flex-col gap-[30px]">
        <Time />
        <Observation />
        <FactOfTheDay />
        <Graph />
      </div>
    </div>
  );
}
