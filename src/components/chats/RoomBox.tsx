"use client";

import { User } from "@/types";
import { useRouter } from "next/navigation";
import { socket } from "../../utils/socket";

export default function RoomBox(props: {
  roomName: string;
  host: User;
  users: User[];
}) {
  const router = useRouter();
  const { roomName, host, users } = props;

  const handleJoin = async () => {
    try {
      const userName: string = sessionStorage.getItem("user")!;
      const socketId: string = sessionStorage.getItem("socketId")!;
      const user: User = { userName, socketId };
      socket.emit("joinRoom", {
        roomName,
        user,
      });
      sessionStorage.setItem("roomName", roomName);
      router.push(`/chats/${roomName}`);
    } catch (err) {
      console.log("[ERROR][RoomBox:handleJoin]: ", err);
    }
  };
  return (
    <div className="p-3 flex flex-col justify-center items-center space-y-1 rounded-xl bg-gradient-to-r from-stone-500 to-stone-950">
      <div className="text-center text-lg text-green-400">{roomName}</div>
      <div className="text-lg text-white text-center">
        {users.length} members
      </div>
      <button
        onClick={handleJoin}
        className="text-lg text-center text-white bg-green-400 rounded-lg w-[50%]"
      >
        Join
      </button>
    </div>
  );
}
