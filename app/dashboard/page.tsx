"use client";
import {
  StatObj,
  StatCard,
} from "@/app/components/dashboardComponents/StatCard";
import DashboardChart from "@/app/components/dashboardComponents/DashboardChart";
import DashboardFees from "@/app/components/dashboardComponents/DashboardFees";
import DashboardAbsentees from "@/app/components/dashboardComponents/DashboardAbsentees";
import { createSupabaseClient } from "@/app/lib/supabase/client";
import DashboardSkeleton from "../skeletons/DashboardSkeleton";
import { Suspense, FC } from "react";

const HomePage: FC = () => {
  const supabase = createSupabaseClient();
  const loggedUser = supabase.auth.getUser();

  const stats: StatObj[] = [
    {
      title: "Revenue this month",
      unit: "GH₵",
      value: 125060,
      percentage: -5,
      link: "/dashboard/customer",
      isPercentage: false,
    },
    {
      title: "Average class performance",
      unit: "",
      value: 75,
      percentage: 5,
      link: "",
      isPercentage: true,
    },
    {
      title: "Profit this month",
      unit: "GH₵",
      value: 215000,
      percentage: 15,
      link: "",
      isPercentage: false,
    },
  ];

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <div className="">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <div className="flex w-full justify-end mb-4">
          <div className="rounded-xl bg-accent text-white px-3 py-2 cursor-pointer duration-300 hover:bg-light-accent">
            Generate Today&apos;s Report
          </div>
        </div>
        <div className="flex w-full gap-3">
          <div className="grid w-7/10 grid-cols-3 grid-rows-4 gap-3 h-full">
            {stats.map((stat, index) => (
              <StatCard
                title={stat.title}
                value={stat.value}
                unit={stat.unit}
                percentage={stat.percentage}
                link={stat.link}
                isPercentage={stat.isPercentage}
                key={index}
              />
            ))}
            <div className="col-span-3 row-span-3 bg-white-0 shadow-md/3 px-5 pt-3 rounded-xl">
              <div className="text-[10px] mb-2">Income over the year</div>
              <DashboardChart />
            </div>
          </div>
          <div className="grid w-3/10 grid-cols-1 grid-rows-5 gap-3 h-full">
            <DashboardFees />
            <DashboardAbsentees />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default HomePage;
