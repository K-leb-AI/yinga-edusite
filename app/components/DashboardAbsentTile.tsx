import { GrEmergency } from "react-icons/gr";

export type Absentee = {
  name: string;
  class: string;
  contact: string;
  index?: number;
};

const colours: string[] = [
  "#FFB3B360",
  "#FFD1A360",
  "#FFF0B360",
  "#A8E6C260",
  "#A6ECEE60",
  "#ADD8FF60",
  "#D9B8F660",
  "#FFB3D960",
];

export const DashboardAbsentTile = (props: Absentee) => {
  return (
    <div className="w-full border-b-1 border-gray/10 px-2 py-3 flex justify-between">
      <div className="flex gap-3 items-center">
        <div
          style={{ backgroundColor: colours[props.index! % 8] }}
          className={
            "grid place-items-center rounded-full w-8 h-8 font-bold text-black"
          }
        >
          {props.name[0]}
        </div>
        <div className="">
          <div className="font-semibold text-xs">{props.name}</div>
          <div className="text-gray">{props.class}</div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <GrEmergency className="text-gray/40" />
        <div className="font-semibold">{props.contact}</div>
      </div>
    </div>
  );
};
