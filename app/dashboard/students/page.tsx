import React from "react";

const StudentsPage = () => {
  return (
    <div className="">
      <h1 className="font-bold text-2xl">Students</h1>
      <div className="flex w-full justify-end mb-4">
        <div className="rounded-xl bg-accent text-white px-3 py-2 cursor-pointer duration-300 hover:bg-light-accent">
          Generate Today&apos;s Report
        </div>
      </div>
      <div className="flex w-full gap-3">
        <div className="grid w-7/10 grid-cols-3 grid-rows-4 gap-3 h-full">
          <div className="col-span-3 row-span-3 bg-white-0 shadow-md/3 px-5 pt-3 rounded-xl">
            <div className="text-[10px] mb-2">Income over the year</div>
          </div>
        </div>
        <div className="grid w-3/10 grid-cols-1 grid-rows-5 gap-3 h-full"></div>
      </div>
    </div>
  );
};

export default StudentsPage;
