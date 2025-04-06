import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "пн", value1: 2, value2: 3 },
  { day: "вт", value1: 3, value2: 5 },
  { day: "ср", value1: 5, value2: 7 },
  { day: "чт", value1: 6, value2: 8 },
  { day: "пт", value1: 8, value2: 10 },
  { day: "сб", value1: 10, value2: 12 },
  { day: "вс", value1: 12, value2: 15 },
];

export default function Graph() {
  return (
    <div className="w-[36.3vw] bg-[#FFFFFF] shadow-xl rounded-xl p-[20px] flex flex-col gap-[20px]">
      <h1 className="font-semibold text-2xl text-[#29A19C] mb-[20px]">
        График успеваемости
      </h1>
      <div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value1"
              stroke="#008080"
              strokeWidth={2}
              dot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="value2"
              stroke="#00C4CC"
              strokeWidth={2}
              dot={{ r: 5 }}
              strokeOpacity={0.5}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
