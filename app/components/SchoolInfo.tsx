import React from "react";
import Link from "next/link";

const SchoolInfoForm = () => {
  return (
    <form
      action=""
      className="flex justify-center items-center flex-col w-[300px]"
    >
      <h1 className="text-xl font-bold">Almost there...</h1>
      <p className="text-gray mb-10 font-light">Let's finish this!</p>
      <div className="flex flex-col mb-3 w-full">
        <label htmlFor="school" className="text-xs mb-2">
          School Name
        </label>
        <input
          type="text"
          id="school"
          className="bg-white-1 w-full h-10 focus:outline-0 px-3 rounded-lg text-sm"
        />
      </div>
      <div className="flex flex-col mb-3 w-full">
        <label htmlFor="contact" className="text-xs mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="contact"
          className="bg-white-1 w-full h-10 focus:outline-0 px-3 rounded-lg text-sm"
        />
      </div>
      <div className="flex flex-col mb-3 w-full">
        <label htmlFor="website" className="text-xs mb-2">
          Website
        </label>
        <input
          type="url"
          id="website"
          className="bg-white-1 w-full h-10 focus:outline-0 px-3 rounded-lg text-sm"
        />
      </div>
      <div className="flex flex-col mb-3 w-full">
        <label htmlFor="country" className="text-xs mb-2">
          Country
        </label>
        <input
          type="text"
          id="country"
          className="bg-white-1 w-full h-10 focus:outline-0 px-3 rounded-lg text-sm"
        />
      </div>
      <div className="flex flex-col mb-10 w-full">
        <label htmlFor="logo" className="text-xs mb-2">
          School Logo
        </label>
        <input
          type="file"
          id="website"
          className="bg-white-1 w-full h-10 focus:outline-0 p-3 text-gray rounded-lg"
        />
      </div>
      <Link
        href={"/auth/signup/welcome"}
        className="w-full h-10 bg-accent rounded-lg text-white text-xs hover:bg-light-accent duration-300 cursor-pointer grid place-content-center"
      >
        Continue
      </Link>
    </form>
  );
};

export default SchoolInfoForm;
