"use client";

import { useState, useEffect } from "react";
import StartChatButton from "./StartChatButton";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function LogIn() {
  const { login } = useAuth() ?? {};
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [startButton, setStartButton] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (userName.trim() && password.trim()) setStartButton(true);
  }, [userName, password]);

  const handleLogIn = async () => {
    setError(false);
    try {
      login && (await login(userName, password));
      router.push("/chats");
    } catch (err: any) {
      setLoginError(err.message);
      setError(true);
    }
  };

  return (
    <div className="w-full md:w-[70%] lg:w-[70%] bg-slate-800 p-5 rounded-lg animate-flip">
      <div className="flex flex-col items-center justify-center space-y-5 animate-flip">
        <div className="h-10">
          {error ? (
            <div className="bg-red-500 text-white rounded-lg text-sm p-1 animate-popOut">
              {loginError}
            </div>
          ) : (
            <></>
          )}
        </div>

        <input
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your username"
          className="w-[70%] md:w-[50%] lg:w-[50%] p-1 text-stone-900 rounded-lg bg-green-200 outline-none"
        ></input>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-[70%] md:w-[50%] lg:w-[50%] p-1 text-stone-900 rounded-lg bg-green-200 outline-none"
        ></input>
        <StartChatButton
          text={"Log In"}
          handleStartChat={handleLogIn}
          startButton={startButton}
        />
      </div>
    </div>
  );
}
