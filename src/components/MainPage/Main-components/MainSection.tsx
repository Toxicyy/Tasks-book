import Stats from "./Stats";
import TodoList from "./TodoList";

export default function MainSection() {
  return (
    <div className="flex">
      <div className="flex flex-col gap-[30px]">
        <Stats />
        <TodoList />
      </div>
    </div>
  );
}
