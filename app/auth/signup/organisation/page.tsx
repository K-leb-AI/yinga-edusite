"use client";
import { useState } from "react";
import SchoolInfoForm from "@/app/components/SchoolInfo";

const schoolInformation = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold">Let's get started</h1>
      <p className="text-gray mb-4 font-light">Unlock seamless management!</p>
      <div className="mb-6 w-4/5"></div>
      <SchoolInfoForm />
    </div>
  );
};

export default schoolInformation;
