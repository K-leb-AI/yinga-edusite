import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type DashboardData = {
  name: String;
  uv: number;
  pv: number;
  amt: number;
};

const data: DashboardData[] = [
  { name: "Jan", uv: 100, pv: 0, amt: 1000 },
  { name: "Feb", uv: 1500, pv: 1100, amt: 1300 },
  { name: "Mar", uv: 1800, pv: 2200, amt: 1500 },
  { name: "Apr", uv: 2500, pv: 2000, amt: 1800 },
  { name: "May", uv: 3200, pv: 2500, amt: 2200 },
  { name: "Jun", uv: 2800, pv: 3500, amt: 2100 },
  { name: "Jul", uv: 3500, pv: 3000, amt: 2600 },
  { name: "Aug", uv: 4200, pv: 3500, amt: 3000 },
  { name: "Sep", uv: 3700, pv: 3300, amt: 2800 },
  { name: "Oct", uv: 3100, pv: 2800, amt: 2400 },
  { name: "Nov", uv: 2700, pv: 2300, amt: 2000 },
  { name: "Dec", uv: 4000, pv: 3600, amt: 3100 },
];

const componentStyle = {
  fontSize: "10px",
  backgroundColor: "#ffffff00",
  outline: "none",
  height: "300px",
};

export default function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height="90%" style={componentStyle}>
      <LineChart
        width={500}
        height={250}
        data={data}
        margin={{
          top: 20,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" style={{ opacity: "40%" }} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip labelStyle={{ color: `#000` }} />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#c64c4c"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
