import { useContext } from "react";
import { ChatContext } from "@/components/contexts/ChatRoom/ChatBox";

const useChat = () => {
  return useContext(ChatContext);
};

export default useChat;
