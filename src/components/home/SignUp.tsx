"use client";

import StartChatButton from "./StartChatButton";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function SignUp() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [startButton, setStartButton] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [userCreated, setUserCreated] = useState<boolean>(false);
  const { signup } = useAuth() ?? {};

  useEffect(() => {
    if (userName.trim() && password.trim() && confirmPassword.trim())
      setStartButton(true);
  }, [userName, password, confirmPassword, setStartButton]);

  const handleSignUp = async () => {
    setError(false);
    setUserCreated(false);
    try {
      if (password === confirmPassword) {
        signup &&
          signup(userName, password)
            .then((response: any) => {
              setUserCreated(true);
            })
            .catch((err: any) => {
              setLoginError(err.message);
              setError(true);
            });
      } else {
        setLoginError("Password did not match!");
        setError(true);
      }
    } catch (err: any) {
      setLoginError(
        err?.message || "There is some internal error!, Please try again."
      );
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
          ) : userCreated ? (
            <div className="bg-green-500 text-white rounded-lg text-sm p-1 animate-popOut">
              User Created Successfully, please login to start chating.
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
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          className="w-[70%] md:w-[50%] lg:w-[50%] p-1 text-stone-900 rounded-lg bg-green-200 outline-none"
        ></input>
        <StartChatButton
          text={"Sign Up"}
          handleStartChat={handleSignUp}
          startButton={startButton}
        />
      </div>
    </div>
  );
}
