"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SignUp from "@/components/home/SignUp";
import LogIn from "@/components/home/LogIn";

export default function StartChat() {
  const router = useRouter();
  const [signup, setSignup] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);

  useEffect(() => {
    const user = sessionStorage.getItem("user")
      ? sessionStorage.getItem("user")
      : null;
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
    <div className="flex flex-col justify-center items-center w-[80%] space-y-10">
      <div className="flex flex-row justify-between w-[70%]">
        <button
          onClick={handleSignup}
          className={`text-lg text-white ${
            signup ? "bg-green-500" : "bg-gray-500"
          } p-1 rounded-lg`}
        >
          Sign Up
        </button>
        <button
          onClick={handleLogin}
          className={`text-lg text-white ${
            login ? "bg-green-500" : "bg-gray-500"
          } p-1 rounded-lg`}
        >
          Log In
        </button>
      </div>

      {signup ? <SignUp /> : <></>}
      {login ? <LogIn /> : <></>}
    </div>
  );
}
