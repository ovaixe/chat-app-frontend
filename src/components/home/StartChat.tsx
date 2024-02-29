"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SignUp from "@/components/home/SignUp";
import LogIn from "@/components/home/LogIn";
import useAuth from "@/hooks/useAuth";

export default function StartChat() {
  const router = useRouter();
  const [signup, setSignup] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const { user } = useAuth() ?? {};

  useEffect(() => {
    if (user) {
      router.push("/chats");
    }
  });

  const handleSignup = () => {
    if (login) {
      setLogin(false);
    }
    setSignup(true);
  };

  const handleLogin = () => {
    if (signup) {
      setSignup(false);
    }
    setLogin(true);
  };

  return (
    <div className="flex flex-col justify-center items-center w-[90%] space-y-10">
      <div className="w-[50%] flex flex-row justify-center bg-slate-800 border-3 border-green-500 rounded-lg">
        <button
          onClick={handleSignup}
          className={`w-[50%] text-lg text-white p-1 rounded-l-lg  ${
            signup ? "bg-green-500" : "bg-slate-800"
          } `}
        >
          Sign Up
        </button>
        <button
          onClick={handleLogin}
          className={`w-[50%] text-lg text-white p-1 rounded-r-lg  ${
            login ? "bg-green-500" : "bg-slate-800"
          } `}
        >
          Log In
        </button>
      </div>

      {signup ? <SignUp /> : <></>}
      {login ? <LogIn /> : <></>}
    </div>
  );
}
