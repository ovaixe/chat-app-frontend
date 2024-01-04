"use client";

import StartChatButton from "./StartChatButton";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/config.json";

export default function SignUp() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [startButton, setStartButton] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [userCreated, setUserCreated] = useState<boolean>(false);

  useEffect(() => {
    setError(false);
    setUserCreated(false);
    if (userName.trim() && password.trim() && confirmPassword.trim())
      setStartButton(true);
  }, [userName, password, confirmPassword, setStartButton]);

  const handleStartChat = async () => {
    try {
      if (password === confirmPassword) {
        const { data: response } = await axios.post(
          `${config.BACKEND_URL}/api/auth/signup`,
          {
            username: userName,
            password: password,
          }
        );

        if (response.isSuccess) {
          setUserCreated(true);
        } else {
          setLoginError(response.error);
          setError(true);
        }
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
      {error ? (
        <div className="bg-red-500 text-white rounded-lg text-sm p-1">
          {loginError}
        </div>
      ) : userCreated ? (
        <div className="bg-green-500 text-white rounded-lg text-sm p-1">
          User Created Successfully, please login to start chating.
        </div>
      ) : (
        <></>
      )}

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
        handleStartChat={handleStartChat}
        startButton={startButton}
      />
    </div>
  );
}
