import { Button } from "antd";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import AddTodo from "../../../images/AddTodo.png";
import WhiteTheme from "../../../images/WhiteTheme.png";
import BlackTheme from "../../../images/BlackTheme.png";
import Anonym from "../../../images/Anonym.jpg";

export default function Header( ) {
    const theme = useSelector((state: AppState) => state.nightMode.mode)
    const currentUser = useSelector((state: AppState)=> state.userSlice)
    return (
        <div className="" >
            <div className="flex items-center justify-between">
                <Button type="primary" style={{width: "186px", height: "42px", background: "#29A19C"}}>
                    <img className="w-[20px] h-[20px]" src={AddTodo} alt="" />
                    <h1 className="text-base font-semibold">Новая задача</h1>
                </Button>
                <img className="w-[27px] h-[27px]" src={theme ? BlackTheme : WhiteTheme} alt="" />

                <div className="flex items-center gap-[10px]">
                    <h1 className="font-semibold text-base">Хорошего дня, {currentUser?.name}</h1>
                    <img className="w-[45px] h-[45px] rounded-4xl" src={Anonym} alt="Avatar" />
                </div>
            </div>
        </div>
    )
}