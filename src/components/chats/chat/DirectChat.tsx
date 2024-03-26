import { DirectMessage, User } from "@/types";
import Header from "./Header";
import DirectMessageBox from "./DirectMessageBox";
import MessageInput from "./MessageInput";
import { useEffect, useRef } from "react";

export default function DirectChat({
  selectedUser,
  setSelectedUser,
}: {
  selectedUser: User;
  setSelectedUser: (user: User | null) => void;
}) {
  const chatBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [selectedUser]);

  const scrollToBottom = () => {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  };

  return (
    <div className="animate-slide text-white bg-gradient-to-r from-stone-500 to-stone-950 w-full md:w[50%] lg:w-[50%] fixed top-0 z-50">
      <Header selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <div
        ref={chatBox}
        className="border-b-4 p-2 flex flex-col gap-2 h-scroll overflow-y-auto"
      >
        {selectedUser && selectedUser.messages.map((message, index) => (
          <DirectMessageBox key={index} message={message} />
        ))}
      </div>
      <MessageInput
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
}
