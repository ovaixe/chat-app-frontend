"use client";

import { User } from "@/types";
import { useRouter } from "next/navigation";
import useSocket from "@/hooks/useSocket";
import useAuth from "@/hooks/useAuth";

export default function RoomBox(props: {
  roomName: string;
  host: User;
  users: User[];
}) {
  const { roomName, host, users } = props;
  const { user, updateUser } = useAuth() ?? {};
  const socket = useSocket();
  const router = useRouter();

  const handleJoin = async () => {
    try {
      const userName: string | undefined = user?.userName;
      const socketId: string | null | undefined = user?.socketId;
      socket?.emit("joinRoom", {
        roomName,
        user: { userName, socketId },
      });

      const newUser = { ...user, roomName };
      updateUser && updateUser(newUser);

      router.push(`/chats/${roomName}`);
    } catch (err: any) {
      console.log("[ERROR][RoomBox:handleJoin]: ", err.message);
    }
  };

  return (
    <div className="p-2 flex flex-col justify-center items-center space-y-1 rounded-xl bg-gradient-to-r from-stone-500 to-stone-950">
      <div className="text-center text-lg text-green-400">{roomName}</div>
      <div className="text-center text-lg text-green-400">
        Host: <span className="text-white">{host.userName}</span>
      </div>
      <div className="text-lg text-white text-center">
        {users.length} {users.length <= 1 ? "member" : "members"}
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
