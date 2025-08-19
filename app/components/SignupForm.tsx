import React from "react";
import Link from "next/link";
import TwoStageToggle from "@/app/components/Toggle";
import { RiAdminFill } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";

const SignupForm = () => {
  return (
    <>
      <form
        action=""
        className="flex justify-center items-center flex-col w-[300px]"
      >
        <h1 className="text-xl font-bold">Let's get started</h1>
        <p className="text-gray mb-4 font-light">Unlock seamless management!</p>
        <div className="mb-10">
          <TwoStageToggle
            stages={[
              { title: "Admin", icon: <RiAdminFill /> },
              { title: "Employee", icon: <FaChalkboardTeacher /> },
            ]}
          />
        </div>
        <div className="flex flex-col mb-3 w-full">
          <label htmlFor="email" className="text-xs mb-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="bg-white-1 w-full h-10 focus:outline-0 px-3 rounded-lg text-sm"
          />
        </div>
        <div className="flex flex-col mb-3 w-full">
          <label htmlFor="password" className="text-xs mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-white-1 w-full h-10 focus:outline-0 px-3 rounded-lg text-sm"
          />
        </div>
        <div className="flex flex-col mb-10 w-full">
          <label htmlFor="password-confirm" className="text-xs mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="password-confirm"
            className="bg-white-1 w-full h-10 focus:outline-0 px-3 rounded-lg text-sm"
          />
        </div>
        <Link
          href={"/auth/signup/step2"}
          className="w-full h-10 bg-accent rounded-lg text-white text-xs hover:bg-light-accent duration-300 cursor-pointer grid place-content-center"
        >
          Continue
        </Link>
        <div className="flex gap-1 mt-3">
          <span>Already have an account?</span>
          <span className="underline font-bold">Login</span>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
