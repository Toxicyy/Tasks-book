import Header from "./Main-components/Header";
import MainSection from "./Main-components/Mainsection";


export default function Main(){
    
    return(
        <div className="flex flex-col h-[100vh] bg-[#FAFAFA] w-[88.3vw] pt-[20px] pl-[70px] pr-[70px] gap-[30px]">
            <Header/>
            <MainSection />
        </div>
    )
}