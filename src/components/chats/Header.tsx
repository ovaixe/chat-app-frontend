"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSocket from "@/hooks/useSocket";
import useAuth from "@/hooks/useAuth";

export default function Header() {
  const router = useRouter();
  const socket = useSocket();
  const { user, logout, updateUser } = useAuth() ?? {};

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    initializeSocket();
  }, [user, socket]);

  const initializeSocket = async () => {
    try {
      const socketId: string | null | undefined = user?.socketId;
      if (!socketId) {
        socket?.connect();
        socket?.on("connect", () => {
          const socketId = socket.id;
          const newUser = { ...user, socketId };
          updateUser && updateUser(newUser);
        });
      }
    } catch (err: any) {
      console.log("[ERROR][chats:Header:initializeSocket]: ", err.message);
    }
  };

  const handleLogOut = () => {
    socket?.disconnect();
    logout && logout();
    router.push("/");
  };

  return (
    <div className="flex flex-row items-center justify-between w-full bg-gradient-to-r from-stone-500 to-stone-950 rounded-2xl p-3">
      <div className="flex items-center">
        <button
          onClick={handleLogOut}
          className="text-white bg-red-500 rounded-md px-1"
        >
          Log Out
        </button>
      </div>
      <div className="flex text-bold text-lg text-green-500 text-start">
        All Chats Here
      </div>
      {user?.userName && (
        <div className="text-white text-center p-1 bg-gray-500 rounded-lg">
          {user?.userName}
        </div>
      )}
    </div>
  );
}
