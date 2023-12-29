"use client";

import React, { createContext } from "react";
import { Socket } from "socket.io-client";
import { socket } from "../../utils/socket";

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
