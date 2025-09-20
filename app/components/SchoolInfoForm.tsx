"use client";
import { useState } from "react";
import Link from "next/link";

const SchoolInfoForm = () => {
  const [schoolName, setSchoolName] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (): void => {
    const schoolData = {
      schoolName,
      contact,
      website,
      country,
    };

    localStorage.setItem("schoolData", JSON.stringify(schoolData));
  };
  return (
    <form
      action=""
      className="flex justify-center items-center flex-col w-[300px]"
    >
      <div className="flex flex-col mb-3 w-full">
        <label htmlFor="school" className="text-xs mb-2">
          School Name
        </label>
        <input
          type="text"
          id="school"
          className="bg-white-1 w-full h-10 focus:outline-0 px-3 rounded-lg text-sm"
          value={schoolName}
          onChange={(e) => {
            setSchoolName(e.target.value);
          }}
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
          value={contact}
          onChange={(e) => {
            setContact(e.target.value);
          }}
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
          value={website}
          onChange={(e) => {
            setWebsite(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col mb-10 w-full">
        <label htmlFor="country" className="text-xs mb-2">
          Country
        </label>
        <input
          type="text"
          id="country"
          className="bg-white-1 w-full h-10 focus:outline-0 px-3 rounded-lg text-sm"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
      </div>

      <Link
        href={"/auth/signup/user"}
        className="w-full h-10 bg-accent rounded-lg text-white text-xs hover:bg-light-accent duration-300 cursor-pointer grid place-content-center"
        onClick={handleSubmit}
      >
        Continue
      </Link>
    </form>
  );
};

export default SchoolInfoForm;
