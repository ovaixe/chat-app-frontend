"use client";

import ChatBox from "@/components/room/ChatBox";
import Header from "@/components/room/Header";
import ChatInput from "@/components/room/ChatInput";
import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import { ChatProvider } from "@/components/contexts/ChatRoom/ChatBox";

export default function Chat({ params }: { params: { room: string } }) {
  return (
    <ProtectedRoute>
      <ChatProvider>
        <div className="flex flex-col items-center space-y-3 justify-center h-screen">
          <Header />
          <ChatBox />
          <ChatInput />
        </div>
      </ChatProvider>
    </ProtectedRoute>
  );
}
