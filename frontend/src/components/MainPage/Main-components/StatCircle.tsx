import { FC } from "react"
import { useSelector } from "react-redux";
import { AppState } from "../../../store";

type Props = {
    value: number | undefined
}

const StatCircle: FC<Props> = ({value}) => {
    const theme = useSelector((state: AppState) => state.nightMode.mode);
    return (
        <>
            <div className=" w-[110px] h-[110px] rounded-[55px] border-[#29A19C] border-2 flex flex-col items-center justify-center">
                <h1 className="text-[#29A19C] font-semibold text-4xl">{value}</h1>
                <h1 className={"duration-500 " + (theme ? " text-white" : " text-[#282846]") + " text-md"}>задач</h1>
            </div>
        </> 
    )
}

export default StatCircle;