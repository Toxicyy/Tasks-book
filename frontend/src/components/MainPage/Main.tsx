import { useSelector } from "react-redux";
import Header from "./Main-components/Header";
import MainSection from "./Main-components/MainSection";
import { AppState } from "../../store";



export default function Main(){
    const theme = useSelector((state: AppState) => state.nightMode.mode);
    
    return(
        <div className={" ml-[14vw] flex flex-col w-[88.3vw] pt-[20px] pl-[70px] pr-[70px] pb-[70px] gap-[30px] duration-500 " + (theme ? " bg-[#222831]" : "bg-[#FAFAFA]") }>
            <Header/>
            <MainSection />
        </div>
    )
}