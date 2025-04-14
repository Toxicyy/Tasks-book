import { useDispatch, useSelector } from "react-redux";
import logo from "../../images/mainPage/header/logo.png";
import { AppDispatch, AppState } from "../../store";
import { toggleNightMode } from "../../state/NightMode.slice";
import WhiteTheme from "../../images/mainPage/header/WhiteTheme.png";
import BlackTheme from "../../images/mainPage/header/BlackTheme.png";

export default function Header() {
  const theme = useSelector((state: AppState) => state.nightMode.mode);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <header
        className={
          "flex justify-between items-center m-[20px] "
        }
      >
        <div className="flex gap-[10px]">
          <img className="w-[55px] h-[55px]" src={logo} alt="logo" />
          <h1 className="font-montserrat font-semibold text-lg/[23px] text-[#29A19C] flex items-center">
            Tasks <br /> Book
          </h1>
        </div>
        <button
          className="cursor-pointer"
          onClick={() => dispatch(toggleNightMode())}
        >
          <img
            className="w-[27px] h-[27px] mr-[20px]"
            src={theme ? BlackTheme : WhiteTheme}
            alt=""
          />
        </button>
      </header>
    </>
  );
}
