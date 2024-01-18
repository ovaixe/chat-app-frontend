"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSocket from "@/hooks/useSocket";
import useAuth from "@/hooks/useAuth";

export default function Header() {
  const { user } = useAuth();
  const socket = useSocket();
  const router = useRouter();
  const [roomName, setRoomName] = useState<string>("");

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
    const roomName = sessionStorage.getItem("roomName")!;
    setRoomName(roomName);
  }, []);

  const handleLeaveRoom = () => {
    const userName = user.userName;
    const socketId = user.socketId;
    sessionStorage.removeItem("roomName");
    socket?.emit("leaveRoom", {
      roomName: roomName,
      user: { userName, socketId },
    });
    router.push("/chats");
  };
  return (
    <div className="flex flex-row w-[90%] p-3 bg-gradient-to-r from-stone-500 to-stone-950 rounded-2xl">
      <div className="w-[45%] flex flex-row justify-start items-center">
        <button
          onClick={handleLeaveRoom}
          className="text-white bg-red-500 rounded-md px-1"
        >
          Leave
        </button>
      </div>
      <div className="w-[55%] text-bold text-lg text-green-500 text-start">
        {roomName}
      </div>
    </div>
  );
}
