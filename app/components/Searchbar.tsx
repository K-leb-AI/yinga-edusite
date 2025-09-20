import React from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <form action="" className="h-full relative w-2/5 ">
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-white-1 h-full rounded-xl px-6 focus:outline-0"
      />
      <button className="absolute top-0.5 right-0.5 m-1 aspect-square bg-accent text-white w-11 rounded-lg grid place-items-center text-sm cursor-pointer hover:bg-light-accent duration-200">
        <FaSearch />
      </button>
    </form>
  );
};

export default Searchbar;
