"use client";
import { FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { createSupabaseClient } from "@/app/lib/supabase/client";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createSupabaseClient();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!data.user && error) {
        console.log(error);
        toast.error(
          error instanceof Error ? error.message : "An error occurred"
        );
        setLoading(false);
        return;
      } else if (data.session && !error) {
        toast.success("Successfully Logged In");
        router.replace("/dashboard");
      }
    } catch (error) {
      console.log("Error Logging In");
      toast(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col w-[300px]">
      <form
        action=""
        className="flex justify-center items-center flex-col w-full"
        onSubmit={(e) => handleLogin(e)}
      >
        <h1 className="text-xl font-bold">Welcome back!</h1>
        <p className="text-gray mb-2 font-light">Back to the grind...</p>

        <div className="flex flex-col mb-3 w-full">
          <label htmlFor="email" className="text-xs mb-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="bg-white-1 w-full h-10 focus:outline-0 px-3 rounded-lg text-xs"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
            value={password}
            required
          />
        </div>
        <button
          className="w-full h-10 bg-accent rounded-lg text-white text-xs hover:bg-light-accent duration-300 cursor-pointer grid place-content-center"
          type="submit"
        >
          {loading ? "Logging in..." : "Continue"}
        </button>
      </form>
      <div className="flex gap-1 mt-3">
        <span>Don't have an account?</span>
        <span className="underline font-bold cursor-pointer">
          <Link href={"/auth/signup/organisation"}>Sign Up</Link>
        </span>
      </div>
      <div className="flex w-full gap-2 items-center mt-5">
        <div className="border w-9/20 border-gray/10 rounded-full"></div>
        OR
        <div className="border w-9/20 border-gray/10 rounded-full"></div>
      </div>
      <button
        className="flex items-center gap-2 justify-center w-full h-10 bg-white-0 shadow-sm rounded-lg text-black font-medium mt-3 text-xs hover:bg-white-1 duration-300 cursor-pointer"
        // onClick={signInWithGoogle}
      >
        <FcGoogle className="size-4" />
        Login with Google
      </button>
    </div>
  );
};

export default LoginForm;
