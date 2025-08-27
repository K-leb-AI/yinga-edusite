import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export const CheckEmail = () => {
  return (
    <div className="flex flex-col w-[300px]">
      <Link
        href="/auth/signup/user"
        className="flex gap-2 text-gray mb-6 cursor-pointer"
      >
        <FaArrowLeft />
        Back
      </Link>
      <h1 className="text-xl font-bold mb-3">Check your email</h1>
      <p className="text-gray mb-4 font-light">
        Click on the link we sent to {} to complete the sign up process
      </p>
    </div>
  );
};
