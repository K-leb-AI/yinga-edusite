"use client";

import Link from "next/link";
import { FaArrowUp } from "react-icons/fa";
import clsx from "clsx";
import { FaArrowTrendUp } from "react-icons/fa6";
import CountUp from "react-countup";

export type StatObj = {
  title: string;
  unit: string;
  value: number;
  percentage: number;
  link: string;
  isPercentage: boolean;
};
export const StatCard = (props: StatObj) => {
  return (
    <div className="bg-white-0 col-span-1 row-span-1 flex flex-col shadow-md/3 justify-between px-5 py-3 h-31.5 rounded-xl">
      <div className="text-[10px] font-medium">{props.title}</div>
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <div className="text-gray text-[10px]">{props.unit}</div>
          <div className="flex text-3xl font-bold">
            {/* <div className="">
              {}
            </div> */}

            <CountUp
              start={0}
              end={
                props.value > 1000
                  ? Math.round(props.value / 1000)
                  : props.value
              }
              suffix={props.isPercentage ? "%" : props.value > 1000 ? "K" : ""}
              delay={0}
            >
              {({ countUpRef }) => (
                <div>
                  <span ref={countUpRef} />
                </div>
              )}
            </CountUp>
          </div>
          <div
            className={clsx("text-[10px] flex items-center gap-1", {
              "text-green-500": props.percentage > 0,
              "text-red-500": props.percentage < 0,
            })}
          >
            <FaArrowTrendUp
              className={clsx("text-[10px]", {
                "rotate-180": props.percentage < 0,
              })}
            />
            {props.percentage}% from last month
          </div>
        </div>
        <Link
          href={props.link}
          className="bg-accent rounded-xl text-white w-10 text-lg font-extralight h-10 grid place-items-center hover:bg-light-accent duration-300 "
        >
          <FaArrowUp className="rotate-45" />
        </Link>
      </div>
    </div>
  );
};
