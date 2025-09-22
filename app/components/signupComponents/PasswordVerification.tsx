"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link"; // Adjust based on your routing library
import { FaArrowLeft } from "react-icons/fa";

const PasswordVerification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle input change

  const handleInputChange = (index: number, value: string): void => {
    // Allow only a single digit
    if (value && !/^[0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Enable the next input if current input has a value
    if (value && index < otp.length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]!.disabled = false;
      inputRefs.current[index + 1]!.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]!.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    const paste = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(paste)) {
      const newOtp = paste.split("");
      setOtp(newOtp);
      // Enable all inputs and focus the last one
      inputRefs.current.forEach((input) => {
        if (input) input.disabled = false;
      });
      if (inputRefs.current[otp.length - 1]) {
        inputRefs.current[otp.length - 1]!.focus();
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length === 6 && /^\d{6}$/.test(code)) {
      console.log("OTP Submitted:", code);
      // Add your submission logic here (e.g., API call)
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  // Initialize first input as enabled
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <>
      <Link href="/auth/signup/step1" className="flex gap-2 text-gray">
        <FaArrowLeft />
        Back
      </Link>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col w-[300px] mt-10"
      >
        <h1 className="text-xl font-bold">Verify Your Email Address</h1>
        <p className="text-gray font-light">
          Please enter the 6-digit code we sent to
        </p>
        <p className="text-accent mb-10 font-light underline">
          sample@gmail.com
        </p>

        <div className="flex gap-3 mb-4">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              id={`otp${index + 1}`}
              className="bg-white-1 h-10 w-10 focus:outline-1 focus:outline-accent focus:text-accent px-2 rounded-lg grid place-items-center text-lg font-bold"
              maxLength={1}
              autoComplete="off"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(index, e)
              }
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={index !== 0 && !otp[index - 1]}
              ref={(el: any) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>

        <Link
          href={"/auth/signup/step3"}
          className="w-full h-10 bg-accent rounded-lg text-white text-xs hover:bg-light-accent duration-300 cursor-pointer grid place-content-center"
        >
          Continue
        </Link>
        <div className="flex gap-1 mt-3">
          <span>Didn't receive the code?</span>
          <span className="underline font-bold">Send again</span>
        </div>
      </form>
    </>
  );
};

export default PasswordVerification;
