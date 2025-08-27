import React from "react";
import { Absentee, DashboardAbsentTile } from "./DashboardAbsentTile";
import Image from "next/image";

const DashboardAbsentees = () => {
  const absentees: Absentee[] = [
    { name: "Kelvin Osei", class: "Primary 6", contact: "0201234569" },
    { name: "Ama Serwaa", class: "Primary 5", contact: "0249876543" },
    { name: "Kojo Mensah", class: "JHS 1", contact: "0263456789" },
    { name: "Abena Asante", class: "Primary 4", contact: "0551239876" },
    { name: "Yaw Owusu", class: "JHS 2", contact: "0278765432" },
    { name: "Esi Nyarko", class: "Primary 3", contact: "0208765432" },
    { name: "Kwame Agyeman", class: "JHS 3", contact: "0234567890" },
    { name: "Afia Adom", class: "Primary 2", contact: "0542345678" },
    { name: "Prince Boateng", class: "Primary 1", contact: "0503456789" },
    { name: "Naana Addo", class: "Kindergarten 2", contact: "0579876543" },
  ];
  return (
    <div className="row-span-3 px-5 py-3 text-[10px] bg-white max-h-80 col-span-1 shadow-md/3 rounded-xl">
      <div className="text-[10px] mb-2 font-medium">Absent Today</div>
      <div className="h-9/10 custom-scrollbar overflow-y-scroll">
        {absentees.length > 0 ? (
          absentees.map((absentee, index) => (
            <DashboardAbsentTile
              name={absentee.name}
              class={absentee.class}
              contact={absentee.contact}
              index={index}
              key={absentee.contact}
            />
          ))
        ) : (
          <div className="flex items-center justify-center gap-6 flex-col w-full h-full">
            <Image
              width={100}
              height={100}
              alt="attendance"
              src={"/attendance.png"}
              className="opacity-30 border"
            />
            <p className="text-gray text-[10px]">
              Hurray!! No absentees today!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAbsentees;
