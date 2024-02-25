"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Message from "./chatbox/Message";
import ServerMessage from "./chatbox/ServerMessage";
import { ChangeEvent, KeyboardEvent, useRef } from "react";
import useSocket from "@/hooks/useSocket";
import useAuth from "@/hooks/useAuth";
import useChat from "@/hooks/useChat";

export default function ChatBox() {
  const router = useRouter();
  const [messages, setMessages] = useState<Array<Message>>([]);
  const { setUserName, setRoomName } = useChat() ?? {};
  const chatBox = useRef<HTMLDivElement>(null);
  const socket = useSocket();
  const { user } = useAuth() ?? {};

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
    const userName = user.userName;
    const roomName = user.roomName;
    if (userName) setUserName && setUserName(userName);
    if (roomName) setRoomName && setRoomName(roomName);
  }, [user, router]);

  useEffect(() => {
    const getMessage = async () => {
      socket?.on("newIncomingMessage", (msg) => {
        setMessages((currentMsg) => [
          ...currentMsg,
          {
            userName: msg.userName,
            message: msg.message,
            timeSent: msg.timeSent,
            roomName: msg.roomName,
          },
        ]);
      });
    };

    getMessage();
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  };

  return (
    <div
      ref={chatBox}
      className="w-full bg-gradient-to-r from-stone-500 to-stone-950 rounded-xl flex-grow overflow-y-auto"
    >
      <div className="flex flex-col space-y-3 p-2">
        {messages.map((message: Message, index: number) =>
          message.userName === "Server" ? (
            <ServerMessage
              key={index}
              userName={message.userName}
              message={message.message}
              timeSent={message.timeSent}
            />
          ) : (
            <Message
              key={index}
              userName={message.userName}
              message={message.message}
              timeSent={message.timeSent}
            />
          )
        )}
      </div>
    </div>
  );
}
