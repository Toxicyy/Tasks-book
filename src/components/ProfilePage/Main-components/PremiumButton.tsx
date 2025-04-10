import { Button } from "antd";

export default function PremiumButton() {
  return (
    <Button
      type="primary"
      style={{
        backgroundColor: "#ECCA75",
        width: "100%",
        height: "45px",
        zIndex: 10,
        position: "relative",
      }}
    >
      <p className="text-[18px] tracking-widest">
        Оформить премиум подписку
      </p>
    </Button>
  );
}