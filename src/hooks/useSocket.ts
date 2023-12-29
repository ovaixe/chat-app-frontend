import { useContext } from "react";
import { SocketContext } from "../components/contexts/SocketContext";

const useSocket = () => {
  return useContext(SocketContext);
};

export default useSocket;
