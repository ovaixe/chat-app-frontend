"use client";

import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { Socket } from "socket.io-client";
import useAuth from "@/hooks/useAuth";

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user, updateUser } = useAuth() ?? {};

  useEffect(() => {
    const initializeSocket = async () => {
      try {
        if (user && user.userName && user.access_token && !user.socketId) {
          const accessToken: string = user.access_token;
          const userName: string  = user.userName;
          const socketOptions = {
            autoConnect: false,
            extraHeaders: {
              authorization: `Bearer ${accessToken}`,
              user: `${userName}`,
            },
          };

          const newSocket = io(
            process.env.NEXT_PUBLIC_SOCKET_URL ?? "",
            socketOptions
          );
          setSocket(newSocket);
        }
      } catch (err: any) {
        console.log("[ERROR][SocketProvider:initializeSocket]: ", err.message);
      }
    };

    initializeSocket();

    socket?.on("disconnect", () => {
      const { socketId, roomName, ...newUser } = user ?? {};
      updateUser && updateUser(newUser);
    });

    // Cleanup the socket on component unmount
    // return () => {
    //   socket?.disconnect();
    // };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
