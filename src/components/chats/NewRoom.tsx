"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useSocket from "@/hooks/useSocket";
import useAuth from "@/hooks/useAuth";

export default function NewRoom() {
  const { user, updateUser } = useAuth() ?? {};
  const socket = useSocket();
  const router = useRouter();
  const [roomName, setRoomName] = useState<string>("");

  const handleCreateRoom = async () => {
    try {
      const userName: string | undefined = user?.userName;
      const socketId: string | null | undefined = user?.socketId;
      socket?.emit(
        "joinRoom",
        {
          roomName: roomName.trim(),
          user: { userName, socketId },
        },
        (response: boolean) => {
          if (response) {
            const newUser = { ...user, roomName };
            updateUser && updateUser(newUser);
            router.push(`/chats/${roomName}`);
          } else {
            router.push("/");
          }
        }
      );
    } catch (err: any) {
      console.log("[ERROR][NewRoom:handleCreateRoom]: ", err.message);
    }
  };

  return (
    <div className="p-5 rounded-xl flex flex-col space-y-5 justify-center items-center bg-gradient-to-r from-stone-500 to-stone-950">
      <label htmlFor="user" className="text-center text-lg text-green-400">
        Create New Rome
      </label>
      <input
        id="user"
        type="text"
        placeholder="Enter room name"
        required
        className="rounded-lg p-2 border-2 border-green-800 bg-green-300 text-stone-700 focus:outline-none"
        onChange={(e) => setRoomName(e.target.value)}
      ></input>
      <button
        className="transition duration-200 hover:scale-110 disabled:scale-100 text-white px-2 disabled:opacity-50 disabled:text-gray-800 disabled:bg-gray-400 text-lg text-center bg-green-400 rounded-lg"
        disabled={roomName.trim() === "" ? true : false}
        onClick={handleCreateRoom}
      >
        Create Room
      </button>
    </div>
  );
}
