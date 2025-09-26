import React from "react";

import StudentsTable from "@/app/components/studentsComponents/StudentsTable";

const StudentsPage = () => {
  return (
    <div className="">
      <h1 className="font-bold text-2xl mb-4">Students</h1>

      <StudentsTable />
    </div>
  );
};

export default StudentsPage;
