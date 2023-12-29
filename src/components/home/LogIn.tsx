"use client";

import { useState, useEffect } from "react";
import StartChatButton from "./StartChatButton";
import { useRouter } from "next/navigation";
import axios from "axios";
import config from "../../config/config.json";

export default function LogIn() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [startButton, setStartButton] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (userName != "" && password != "") {
      setStartButton(true);
    }
  }, [userName, password, setStartButton]);

  const handleStartChat = async () => {
    try {

      const { data: resp } = await axios.post(
        `${config.BACKEND_URL}/auth/login`,
        {
          username: userName,
          password: password,
        }
      );
      if (resp.isSuccess) {
        sessionStorage.setItem("user", resp.data.userName);
        router.push("/chats");
      } else {
        setLoginError("Invalid username and password");
        setError(true);
      }
    } catch (err) {
      console.log("[ERROR][LogIn:handleStartChat]", err);
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
      <StartChatButton
        handleStartChat={handleStartChat}
        startButton={startButton}
      />
    </div>
  );
}
