import FactOfTheDay from "../../MainPage/Main-components/FactOfTheDay";
import Observation from "../../MainPage/Main-components/Observation";
import Time from "../../MainPage/Main-components/Time";
import PremiumButton from "./PremiumButton";
import UserForm from "./UserForm";

export default function MainSection() {
  return (
    <div className="flex justify-center flex-wrap xl:justify-between">
      <div className="mr-[15px]">
        <UserForm />
      </div>
      <div className="flex flex-col gap-[30px]">
        <PremiumButton />
        <Time />
        <Observation />
        <FactOfTheDay />
      </div>
    </div>
  );
}
