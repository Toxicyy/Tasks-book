import { FC } from "react"

type Props = {
    value: number
}

const StatCircle: FC<Props> = ({value}) => {
    return (
        <>
            <div className=" w-[110px] h-[110px] rounded-[55px] border-[#29A19C] border-2 flex flex-col items-center justify-center">
                <h1 className="text-[#29A19C] font-semibold text-4xl">{value}</h1>
                <h1 className="text-[#282846} text-md">задач</h1>
            </div>
        </> 
    )
}

export default StatCircle;