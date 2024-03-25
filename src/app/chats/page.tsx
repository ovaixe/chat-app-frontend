"use client";

import Header from "@/components/chats/Header";
import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import MenuBar from "@/components/chats/MenuBar";
import RoomSection from "@/components/chats/room/RoomSection";
import ChatSection from "@/components/chats/chat/ChatSection";
import { useState } from "react";

export default function Chats() {
  const [active, setActive] = useState<string>("chats");

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center space-y-10 p-3 bg-slate-800 h-screen">
        <Header />
        {active === "chats" ? <ChatSection /> : <RoomSection />}
        <MenuBar active={active} setActive={setActive} />
      </div>
    </ProtectedRoute>
  );
}
