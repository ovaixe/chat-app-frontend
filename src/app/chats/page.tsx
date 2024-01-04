"use client";

import NewRoom from "../../components/chats/NewRoom";
import Header from "@/components/chats/Header";
import AllRooms from "@/components/chats/AllRooms";
import ProtectedRoute from "@/components/HOC/ProtectedRoute";

export default function Chats() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col justify-center items-center space-y-10 p-3">
        <Header />
        <div className="mt-10">
          <NewRoom />
        </div>
        <AllRooms />
      </div>
    </ProtectedRoute>
  );
}
