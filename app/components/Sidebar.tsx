"use client";
import React, { FC, ReactNode, useState } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { PiStudentBold, PiExamFill } from "react-icons/pi";
import { MdClass, MdSubject, MdChecklist } from "react-icons/md";
import { FaChalkboardTeacher, FaMoneyBillWave } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { SiTestrail } from "react-icons/si";
import { HiDocumentReport } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import clsx from "clsx";
import Link from "next/link";

type Route = {
  routeName: string;
  icon: ReactNode;
  active: boolean;
  routeLink: string;
};

const Sidebar: FC = () => {
  const [routes, setRoutes] = useState<Route[]>([
    {
      routeName: "Dashboard",
      icon: <RiDashboardFill />,
      active: true,
      routeLink: "/dashboard/home",
    },
    {
      routeName: "Students",
      icon: <PiStudentBold />,
      active: false,
      routeLink: "/dashboard/home",
    },
    { routeName: "Classes", icon: <MdClass />, active: false, routeLink: "/" },
    {
      routeName: "Subject",
      icon: <MdSubject />,
      active: false,
      routeLink: "/dashboard/home",
    },
    {
      routeName: "Teacher",
      icon: <FaChalkboardTeacher />,
      active: false,
      routeLink: "/dashboard/home",
    },
    {
      routeName: "Attendance",
      icon: <MdChecklist />,
      active: false,
      routeLink: "/dashboard/home",
    },
    { routeName: "Homework", icon: <IoHome />, active: false, routeLink: "/" },
    {
      routeName: "Class Tests",
      icon: <SiTestrail />,
      active: false,
      routeLink: "/dashboard/home",
    },
    {
      routeName: "Examinations",
      icon: <PiExamFill />,
      active: false,
      routeLink: "/dashboard/home",
    },
    {
      routeName: "Report Cards",
      icon: <HiDocumentReport />,
      active: false,
      routeLink: "/dashboard/home",
    },
    {
      routeName: "Fees",
      icon: <FaMoneyBillWave />,
      active: false,
      routeLink: "/dashboard/home",
    },
  ]);

  const handleClick = (clickedRoute: Route) => {
    setRoutes((prevRoutes) =>
      prevRoutes.map((route) => ({
        ...route,
        active: route.routeName === clickedRoute.routeName,
      }))
    );
  };
  return (
    <aside className="bg-white w-1/6 px-10 py-8 h-screen flex flex-col border-r-1 border-gray/20 justify-between">
      <div className="flex gap-2 text-sm text-accent items-center">
        <RiDashboardFill />
        <div className="font-bold">Yinga Edusite</div>
      </div>
      <div className="">
        {routes.map((route) => (
          <Link
            href={route.routeLink}
            className={clsx(
              "flex gap-4 mb-5 items-center px-4 cursor-pointer duration-200",
              {
                "text-gray hover:text-accent": route.active === false,
                "text-accent bg-white-2 font-medium rounded-xl relative py-2 before:content-[''] before:absolute before:w-1 before:h-4 before:bg-accent before:left-1 before:rounded-full":
                  route.active === true,
              }
            )}
            onClick={() => handleClick(route)}
            key={route.routeName}
          >
            {route.icon}
            {route.routeName}
          </Link>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <BiLogOut />
        Logout
      </div>
    </aside>
  );
};

export default Sidebar;
