"use client";

import StartChatButton from "./StartChatButton";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/config.json";
import useAuth from "../../hooks/useAuth";

export default function SignUp() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [startButton, setStartButton] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [userCreated, setUserCreated] = useState<boolean>(false);
  const { user, signup } = useAuth();

  useEffect(() => {
    if (userName.trim() && password.trim() && confirmPassword.trim())
      setStartButton(true);
  }, [userName, password, confirmPassword, setStartButton]);

  const handleSignUp = async () => {
    setError(false);
    setUserCreated(false);
    try {
      if (password === confirmPassword) {
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
      console.log("[ERROR][SignUp:handleStartChat]", err);
      setLoginError("There is some internal error!, Please try again.");
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
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
        className="p-1 text-stone-900 rounded-lg bg-green-200 outline-none"
      ></input>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className="p-1 text-stone-900 rounded-lg bg-green-200 outline-none"
      ></input>
      <input
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm password"
        className="p-1 text-stone-900 rounded-lg bg-green-200 outline-none"
      ></input>
      <StartChatButton
        text={"Sign Up"}
        handleStartChat={handleSignUp}
        startButton={startButton}
      />
    </div>
  );
}
