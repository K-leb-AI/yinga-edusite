"use client";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "../../lib/supabase/client";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import toast from "react-hot-toast";

const SignupForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("schoolData");
      const schoolData = storedData ? JSON.parse(storedData) : null;
      if (
        schoolData?.schoolName === "" ||
        schoolData?.contact === "" ||
        schoolData?.website === "" ||
        schoolData?.country === ""
      ) {
        router.replace("/auth/signup/organisation");
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      router.replace("/auth/signup/organisation");
    }
  }, [router]);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createSupabaseClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name,
        },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      console.log("Error in handleSignUp: ", error.message);
      toast.error(error.message || "Signup failed. Please try again.");
      setLoading(false);
      return;
    } else {
      toast.success(
        "Account created! Please check your email for verification."
      );
      router.push("/auth/signup/checkemail");
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
        onSubmit={(e) => handleSignUp(e)}
      >
        <h1 className="text-xl font-bold">Almost there...</h1>
        <p className="text-gray mb-2 font-light">Let&apos;s finish this!</p>

        <div className="flex flex-col mb-3 w-full">
          <label htmlFor="name" className="text-xs mb-2">
            Full name
          </label>
          <input
            type="text"
            id="name"
            className="bg-white-1 w-full h-10 focus:outline-0 px-3 rounded-lg text-xs"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="flex flex-col mb-3 w-full">
          <label htmlFor="email" className="text-xs mb-2">
            Email
          </label>
          <input
            type="email"
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
          {loading ? "Signing up..." : "Continue"}
        </button>
      </form>
      <div className="flex gap-1 mt-3">
        <span>Already have an account?</span>
        <span className="underline font-bold">
          <Link href={"/auth/login"}>Login</Link>
        </span>
      </div>
      <div className="flex w-full gap-2 items-center mt-5">
        <div className="border w-9/20 border-gray/10 rounded-full"></div>
        OR
        <div className="border w-9/20 border-gray/10 rounded-full"></div>
      </div>
      <button
        className="flex items-center gap-2 justify-center w-full h-10 bg-white-0 shadow-sm rounded-lg text-black font-medium mt-3 text-xs hover:bg-white-1 duration-300 cursor-pointer"
        onClick={signInWithGoogle}
      >
        <FcGoogle className="size-4" />
        Sign in with Google
      </button>
    </div>
  );
};

export default SignupForm;
