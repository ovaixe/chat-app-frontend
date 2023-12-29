"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "../../utils/socket";

export default function NewRoom() {
  const router = useRouter();
  const [roomName, setRoomName] = useState<string>("");

  const handleCreateRoom = async () => {
    try {
      const userName = sessionStorage.getItem("user");
      const socketId = sessionStorage.getItem("socketId");
      socket.emit("joinRoom", {
        roomName,
        user: { userName, socketId },
      });

      sessionStorage.setItem("roomName", roomName);
      router.push(`/chats/${roomName}`);
    } catch (err) {
      console.log("[ERROR][NewRoom:handleCreateRoom]: ", err);
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
        className="text-white px-2 disabled:opacity-50 disabled:text-gray-800 disabled:bg-gray-400 text-lg text-center bg-green-400 rounded-lg"
        disabled={roomName === "" ? true : false}
        onClick={handleCreateRoom}
      >
        Create Room
      </button>
    </div>
  );
}
