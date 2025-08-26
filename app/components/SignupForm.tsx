"use client";
import React from "react";
import Link from "next/link";
import TwoStageToggle from "@/app/components/Toggle";
import { RiAdminFill } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "../lib/supabase/client";
import { FcGoogle } from "react-icons/fc";

const SignupForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSignUp = async () => {
    const supabase = createSupabaseClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: role },
      },
    });
    if (error) {
      console.log("There was a big error!!");
      setError(error.message);
    } else {
      router.push("/dashboard");
      console.log("There was no error!!");
    }
  };

  const signInWithGoogle = async () => {
    const supabase = createSupabaseClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  return (
    <div className="flex justify-center items-center flex-col w-[300px]">
      <form
        action=""
        className="flex justify-center items-center flex-col w-full"
      >
        <h1 className="text-xl font-bold">Let's get started</h1>
        <p className="text-gray mb-4 font-light">Unlock seamless management!</p>
        <div className="mb-10 w-4/5">
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
            className="bg-white-1 w-full h-10 focus:outline-0 px-3 rounded-lg text-xs"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col mb-3 w-full">
          <label htmlFor="password" className="text-xs mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-white-1 w-full h-10 focus:outline-0 px-3 rounded-lg text-xs"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          // href={"/auth/signup/step2"}
          className="w-full h-10 bg-accent rounded-lg text-white text-xs hover:bg-light-accent duration-300 cursor-pointer grid place-content-center"
          onClick={handleSignUp}
        >
          Continue
        </button>
      </form>
      <div className="flex gap-1 mt-3">
        <span>Already have an account?</span>
        <span className="underline font-bold">Login</span>
      </div>
      <div className="flex w-full gap-2 items-center mt-5">
        <div className="border w-9/20 border-gray/10 rounded-full"></div>
        OR
        <div className="border w-9/20 border-gray/10 rounded-full"></div>
      </div>
      <button
        // href={"/auth/signup/step2"}
        className="flex items-center gap-2 justify-center w-full h-10 bg-white shadow-sm rounded-lg text-black font-medium mt-3 text-xs hover:bg-white-1 duration-300 cursor-pointer"
        onClick={signInWithGoogle}
      >
        <FcGoogle className="size-4" />
        Sign in with Google
      </button>
    </div>
  );
};

export default SignupForm;
