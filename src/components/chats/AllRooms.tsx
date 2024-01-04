"use client";

import RoomBox from "./RoomBox";
import { useState, useEffect } from "react";
import { Room } from "@/types";
import useSocket from "@/hooks/useSocket";

export default function AllRooms() {
  const socket = useSocket();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    socket?.emit("getRooms");
    getAllRooms();
  }, []);

  const getAllRooms = (): void => {
    socket?.on("allRooms", (rooms) => {
      setRooms(rooms);
    });
  };

  return (
    <div className="w-full grid grid-cols-2 gap-4 lg:grid-cols-4">
      {rooms.map((room, index) => (
        <RoomBox
          roomName={room.name}
          host={room.host}
          users={room.users}
          key={index}
        />
      ))}
    </div>
  );
}
