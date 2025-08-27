"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "../lib/supabase/client";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const checkEmail = () => {
  return (
    <div className="flex flex-col w-[300px]">
      <Link href="/auth/signup/user" className="flex gap-2 text-gray mb-6">
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

const SignupForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createSupabaseClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // options: {
      //   emailRedirectTo: `${window.location.origin}/dashboard`,
      // },
    });

    //Create User profile here

    if (error) {
      console.log("Error in handleSignUp: ", error.message);
      setError(error.message);
      setLoading(false);
      return;
    } else {
      router.push("/auth/signup/checkemail");
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

    //Create User profile here
  };

  return (
    <div className="flex justify-center items-center flex-col w-[300px]">
      <form
        action=""
        className="flex justify-center items-center flex-col w-full"
        onSubmit={(e) => handleSignUp(e)}
      >
        <h1 className="text-xl font-bold">Almost there...</h1>
        <p className="text-gray mb-2 font-light">Let's finish this!</p>

        <div className="flex flex-col mb-3 w-full">
          <label htmlFor="name" className="text-xs mb-2">
            Full name
          </label>
          <input
            type="text"
            id="name"
            className="bg-white-1 w-full h-10 focus:outline-0 px-3 rounded-lg text-xs"
            onChange={(e) => setEmail(e.target.value)}
            required
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
          type="submit"
        >
          {loading ? "Signing up..." : "Continue"}
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
