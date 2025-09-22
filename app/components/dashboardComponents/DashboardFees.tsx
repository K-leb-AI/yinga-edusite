import React from "react";
import {
  ComposedChart,
  Bar,
  Area,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Prim. 6A",
    uv: 1590,
    pv: 1800,
    amt: 1400,
  },
  {
    name: "Prim. 2B",
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: "Prim. 1A",
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: "JHS 2A",
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
];

const DashboardFees = () => {
  return (
    <div className="row-span-2 h-52 px-5 py-3 bg-white-0 col-span-1 shadow-md/3 rounded-xl">
      <div className="text-[10px] font-medium">Top Class Performances</div>
      <div className="w-full h-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{ fontSize: "10px" }}
        >
          <ComposedChart
            layout="vertical"
            data={data}
            margin={{
              top: 20,
              right: 0,
              bottom: 20,
              left: 0,
            }}
          >
            <YAxis dataKey="name" type="category" scale="band" />
            <Tooltip />
            <Area dataKey="amt" fill="#10534400" stroke="#105344500" />

            <Bar dataKey="pv" barSize={30} fill="#00cf9171" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardFees;
