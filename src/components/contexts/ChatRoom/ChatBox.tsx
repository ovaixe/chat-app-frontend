"use client";

import React, { createContext, useState } from "react";
import { ChangeEvent, KeyboardEvent } from "react";
import { ChatContextValue } from "@/types";
import useSocket from "@/hooks/useSocket";

export const ChatContext = createContext<ChatContextValue | null>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useSocket();
  const [userName, setUserName] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const sendMessage = async () => {
    const createdAt: Date = new Date();
    const newMsg: Message = {
      userName: userName,
      message: message.trim(),
      timeSent: createdAt,
      roomName: roomName,
    };
    socket?.emit("sendMessage", newMsg);

    setMessage("");
  };

  const hanldeMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const message = e.target.value;
    setMessage(message);
  };

  const handleKeypress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && message?.trim()) {
      sendMessage();
    }
  };

  return (
    <ChatContext.Provider
      value={{
        message,
        setMessage,
        userName,
        setUserName,
        roomName,
        setRoomName,
        sendMessage,
        hanldeMessageChange,
        handleKeypress,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
