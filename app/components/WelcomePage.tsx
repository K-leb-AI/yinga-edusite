import React from "react";
import { MdCelebration } from "react-icons/md";

const WelcomePage = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <MdCelebration className="size-40 text-accent mb-6" />
      <h1 className="text-xl text-accent font-bold mb-1">
        Welcome to Yinga Edusuite!!
      </h1>
      <p className="text-gray">
        You will be logged into your dashboard in a moment
      </p>
    </div>
  );
};

export default WelcomePage;
