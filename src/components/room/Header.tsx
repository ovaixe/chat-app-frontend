"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSocket from "@/hooks/useSocket";
import useAuth from "@/hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { getRoomHost } from "@/utils/FetchData";
import { User } from "@/types";

export default function Header() {
  const { user, updateUser } = useAuth();
  const socket = useSocket();
  const router = useRouter();
  const [roomName, setRoomName] = useState<string>("");
  const [roomHost, setRoomHost] = useState<User | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
    if (!user.roomName) {
      router.push("/chats");
      return;
    }

    const roomName = user.roomName;
    setRoomName(roomName);
  }, [user, router]);

  useEffect(() => {
    const roomHost = async () => {
      if (roomName) {
        const host = await getRoomHost(roomName);
        setRoomHost(host);
      }
    };
    roomHost();
  }, [socket, roomName]);

  const handleLeaveRoom = () => {
    const userName = user.userName;
    const socketId = user.socketId;

    const { roomName, ...newUser } = user;
    updateUser(newUser);
    socket?.emit("leaveRoom", {
      roomName: roomName,
      user: { userName, socketId },
    });
    router.push("/chats");
  };

  return (
    <div className="flex flex-row items-center justify-between w-[90%] p-3 bg-gradient-to-r from-stone-500 to-stone-950 rounded-2xl">
      <div className="flex flex-row justify-start items-center">
        <button
          onClick={handleLeaveRoom}
          className="text-white bg-red-500 rounded-md px-1"
        >
          Leave
        </button>
      </div>
      <div className="text-bold text-lg text-white text-start bg-green-500 p-1 rounded-lg">
        {roomName}
      </div>
      <div className="flex items-center space-x-2 text-gray-900 text-center p-1 bg-gray-500 rounded-lg">
        <div>{user?.userName}</div>
        {roomHost?.userName === user?.userName && (
          <FontAwesomeIcon icon={faUserTie} />
        )}
      </div>
    </div>
  );
}
