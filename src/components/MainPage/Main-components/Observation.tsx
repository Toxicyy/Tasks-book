import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { openModal } from "../../../state/AddTodoModal.slice";

export default function Observation(){
    const dispatch = useDispatch<AppDispatch>();
    return(
        <div className="w-[36.3vw] bg-[#FFFFFF] shadow-xl rounded-xl p-[20px]">
            <h1 className="font-semibold text-2xl text-[#29A19C] mb-[20px]">Наблюдение</h1>
            <p>Больше всего задач вы <span className="text-[#29A19C] underline cursor-pointer" onClick={() => dispatch(openModal())}>создаете</span> в Понедельник</p>
            <p>Больше всего задач вы завершаете во Вторник</p>
        </div>
    )
}