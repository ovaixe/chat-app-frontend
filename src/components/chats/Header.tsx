"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSocket from "@/hooks/useSocket";

export default function Header() {
  const router = useRouter();
  const socket = useSocket();

  useEffect(() => {
    initializeSocket();
  }, []);

  const initializeSocket = async () => {
    try {
      const socketId = sessionStorage.getItem("socketId")
        ? sessionStorage.getItem("socketId")
        : null;
      if (!socketId) {
        socket?.connect();
        socket?.on("connect", () => {
          const socketId = socket.id;
          sessionStorage.setItem("socketId", socketId);
        });
      }
    } catch (err) {
      console.log("[ERROR][Header:initializeSocket]: ", err);
    }
  };

  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("socketId");
    socket?.disconnect();
    router.push("/");
  };

  return (
    <div className="flex flex-row w-[90%] bg-gradient-to-r from-stone-500 to-stone-950 rounded-2xl p-3">
      <div className="w-[45%] flex items-center">
        <button
          onClick={handleLogOut}
          className="text-white bg-red-500 rounded-md px-1"
        >
          Log Out
        </button>
      </div>
      <div className="w-[55%] flex text-bold text-lg text-green-500 text-start">
        All Chats Here
      </div>
    </div>
  );
}
