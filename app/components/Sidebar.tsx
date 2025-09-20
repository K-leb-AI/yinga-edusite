"use client";
import React, { FC, ReactNode, useEffect, useState } from "react";
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
import { createSupabaseClient } from "../lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

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
      routeLink: "/dashboard",
    },
    {
      routeName: "Students",
      icon: <PiStudentBold />,
      active: false,
      routeLink: "/dashboard",
    },
    { routeName: "Classes", icon: <MdClass />, active: false, routeLink: "/" },
    {
      routeName: "Subject",
      icon: <MdSubject />,
      active: false,
      routeLink: "/dashboard",
    },
    {
      routeName: "Teacher",
      icon: <FaChalkboardTeacher />,
      active: false,
      routeLink: "/dashboard",
    },
    {
      routeName: "Attendance",
      icon: <MdChecklist />,
      active: false,
      routeLink: "/dashboard",
    },
    { routeName: "Homework", icon: <IoHome />, active: false, routeLink: "/" },
    {
      routeName: "Class Tests",
      icon: <SiTestrail />,
      active: false,
      routeLink: "/dashboard",
    },
    {
      routeName: "Examinations",
      icon: <PiExamFill />,
      active: false,
      routeLink: "/dashboard",
    },
    {
      routeName: "Report Cards",
      icon: <HiDocumentReport />,
      active: false,
      routeLink: "/dashboard",
    },
    {
      routeName: "Fees",
      icon: <FaMoneyBillWave />,
      active: false,
      routeLink: "/dashboard",
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

  const supabase = createSupabaseClient();
  const router = useRouter(); // Move hook to component level

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    const handleAuthCheck = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
      } catch (error) {
        console.log("Error in Logout function");
      }
    };
    handleAuthCheck();
  }, []);

  return (
    <aside className="bg-white-0 w-1/6 px-10 py-8 h-screen flex flex-col border-r-1 border-gray/20 justify-between">
      <div className="flex gap-2 text-sm text-accent items-center">
        <RiDashboardFill />
        <div className="font-bold">Yinga Edusite</div>
      </div>
      <div className="">
        {routes.map((route, index) => (
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
            key={index}
          >
            {route.icon}
            {route.routeName}
          </Link>
        ))}
      </div>
      <Link
        className="flex gap-2 items-center hover:font-bold hover:text-white duration-200 cursor-pointer bg-white-1 hover:bg-red-500 rounded-xl py-2 px-4"
        onClick={handleLogout}
        href={"/auth/signup/organisation"}
      >
        <BiLogOut />
        Logout
      </Link>
    </aside>
  );
};

export default Sidebar;
