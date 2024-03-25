import { LuSendHorizonal } from "react-icons/lu";
import useSocket from "@/hooks/useSocket";
import { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { DirectMessage, User } from "@/types";
import useAuth from "@/hooks/useAuth";

export default function MessageInput({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: User;
  setSelectedUser: (user: User) => void;
}) {
  const socket = useSocket();
  const { user } = useAuth() ?? {};
  const [userName, setUserName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (user && user.userName) setUserName(user?.userName);
  }, [user]);

  const sendMessage = async () => {
    const createdAt: Date = new Date();
    const newMsg: DirectMessage = {
      content: message.trim(),
      timeSent: createdAt,
      fromSelf: false,
    };
    socket?.emit("direct-message", {
      message: newMsg,
      to: selectedUser.socketId,
    });

    const updatedUser = {...selectedUser};
    updatedUser.messages.push({
      content: message.trim(),
      timeSent: createdAt,
      fromSelf: true,
    });
    setSelectedUser(updatedUser);

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
    <>
      <div className="fixed bottom-0 px-2 py-2 w-full md:w[50%] lg:w-[50%] bg-slate-500 flex flex-row space-x-3 justify-between items-cneter place-self-center">
        <textarea
          rows={1}
          onChange={hanldeMessageChange}
          onKeyUp={handleKeypress}
          value={message}
          className="p-2.5 w-full rounded-lg text-white bg-slate-800 focus:outline-none"
        ></textarea>
        <button
          onClick={sendMessage}
          className="items-center inline-flex justify-center px-4 py-2 text-sm bg-green-400 rounded-lg disabled:bg-stone-400 disabled:text-gray-700 text-white"
          disabled={message?.trim() ? false : true}
        >
          <LuSendHorizonal className="text-2xl" />
        </button>
      </div>
    </>
  );
}
