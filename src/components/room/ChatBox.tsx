"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Message from "./chatbox/Message";
import ServerMessage from "./chatbox/ServerMessage";
import { ChangeEvent, KeyboardEvent, useRef } from "react";
import useSocket from "@/hooks/useSocket";
import useAuth from "@/hooks/useAuth";
import { LuSendHorizonal } from "react-icons/lu";

export default function ChatBox() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [roomName, setRoomName] = useState<string>("");
  const [messageBoxRows, setMessageBoxRows] = useState(1);
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
    if (userName) setUserName(userName);
    if (roomName) setRoomName(roomName);
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
    const messageRows = message.split("\n").length;
    // setMessageBoxRows(messageRows);
  };

  const handleKeypress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && message.trim()) {
      sendMessage();
    }
  };

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
      <div className="px-2 w-full lg:w-[50%] md:w-[50%] flex flex-row space-x-3 justify-between items-cneter fixed bottom-3 place-self-center">
        <textarea
          rows={messageBoxRows}
          onChange={hanldeMessageChange}
          onKeyUp={handleKeypress}
          value={message}
          className="p-2.5 w-full rounded-lg text-white bg-slate-800 focus:outline-none"
        ></textarea>
        <button
          onClick={sendMessage}
          className="items-center inline-flex justify-center px-4 py-2 text-sm bg-green-400 rounded-lg disabled:bg-stone-400 disabled:text-gray-700 text-white"
          disabled={message.trim() ? false : true}
        >
          <LuSendHorizonal className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
