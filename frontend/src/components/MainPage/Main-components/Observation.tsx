import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../store";
import { openModal } from "../../../state/AddTodoModal.slice";

export default function Observation(){
    const theme = useSelector((state: AppState) => state.nightMode.mode);
    const dispatch = useDispatch<AppDispatch>();
    return(
        <div className={"w-[36.3vw] duration-500 shadow-xl rounded-xl p-[20px] " + (theme ? " bg-[#2C3440]" : "bg-[#FFFFFF]")}>
            <h1 className="font-semibold text-2xl text-[#29A19C] mb-[20px]">Наблюдение</h1>
            <p className={theme ? "text-white duration-500" : "text-black duration-500"}>Больше всего задач вы <span className="text-[#29A19C] underline cursor-pointer" onClick={() => dispatch(openModal())}>создаете</span> в Понедельник</p>
            <p className={theme ? "text-white duration-500" : "text-black duration-500"}>Больше всего задач вы завершаете во Вторник</p>
        </div>
    )
}