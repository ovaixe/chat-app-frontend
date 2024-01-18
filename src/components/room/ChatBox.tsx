"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Message from "./Message";
import ServerMessage from "./ServerMessage";
import { KeyboardEvent, useRef } from "react";
import useSocket from "@/hooks/useSocket";
import useAuth from "@/hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function ChatBox() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [roomName, setRoomName] = useState<string>("");
  const chatBox = useRef<HTMLDivElement>(null);
  const socket = useSocket();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
    const userName = user.userName;
    const roomName = sessionStorage.getItem("roomName");
    if (userName) setUserName(userName);
    if (roomName) setRoomName(roomName);
  }, []);

  useEffect(() => {
    getMessage();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const sendMessage = async () => {
    const createdAt: Date = new Date();
    const newMsg: Message = {
      userName: userName,
      message: message,
      timeSent: createdAt,
      roomName: roomName,
    };
    socket?.emit("sendMessage", newMsg);

    setMessage("");
  };

  const handleKeypress = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      if (message) sendMessage();
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
      className="w-full md:w-[60%] lg:w-[40%] bg-gradient-to-r from-stone-500 to-stone-950 rounded-xl flex-grow overflow-y-auto"
    >
      <div className="flex flex-col">
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
        <div className="w-[95%] lg:w-[40%] flex flex-row justify-between items-cneter fixed bottom-3 place-self-center">
          <textarea
            rows={1}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={handleKeypress}
            value={message}
            className="p-2.5 w-[80%] rounded-lg text-stone-700 bg-green-300 focus:outline-none"
          ></textarea>
          <button
            onClick={sendMessage}
            className="w-[15%] items-center inline-flex justify-center p-2 text-sm bg-green-400 rounded-lg disabled:bg-stone-400 disabled:text-gray-700 text-white"
            disabled={message === "" ? true : false}
          >
            <svg
              className="w-5 h-5 rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
