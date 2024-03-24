import { useState, useEffect } from "react";
import { User, DirectMessage } from "@/types";
import useSocket from "@/hooks/useSocket";
import useAuth from "@/hooks/useAuth";
import ActiveUser from "./ActiveUser";
import DirectChat from "./DirectChat";

export default function ChatSection() {
  const socket = useSocket();
  const { user } = useAuth() ?? {};
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    socket?.emit("activeUsers");

    socket?.on("activeUsers", (activeUsers) => {
      activeUsers = activeUsers.filter(
        (activeUser: User) => activeUser.userName !== user?.userName
      );
      setActiveUsers(activeUsers);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on(
      "direct-message",
      ({ message, from }: { message: DirectMessage; from: string }) => {
        const userIndex = activeUsers.findIndex(
          (user) => user.socketId === from
        );
        if (userIndex !== -1) {
          const updatedUsers = [...activeUsers];
          const messages = [...updatedUsers[userIndex].messages, message];
          if (updatedUsers[userIndex].userName !== selectedUser?.userName) {
            updatedUsers[userIndex] = {
              ...updatedUsers[userIndex],
              messages,
              hasNewMessages: true,
            };
          } else {
            updatedUsers[userIndex] = { ...updatedUsers[userIndex], messages };
          }
          setActiveUsers(updatedUsers);
        }
      }
    );
  }, [socket, activeUsers]);

  useEffect(() => {
    for (let i = 0; i < activeUsers.length; i++) {
      const curUser = activeUsers[i];
      if (curUser.socketId === selectedUser?.socketId) {
        setSelectedUser(curUser);
        break;
      }
    }
  }, [activeUsers]);

  const handleSelectedUser = (user: User) => {
    if (selectedUser) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
      const userIndex = activeUsers.findIndex(
        (u) => u.userName === user.userName
      );
      if (userIndex !== -1) {
          const updatedUsers = [...activeUsers];
        updatedUsers[userIndex] = { ...updatedUsers[userIndex], hasNewMessages: false };
          setActiveUsers(updatedUsers);
        }
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full flex flex-col gap-3">
        {activeUsers.map((user, index) => (
          <ActiveUser
            key={index}
            user={user}
            handleSelectedUser={handleSelectedUser}
          ></ActiveUser>
        ))}
      </div>
      {selectedUser && (
        <DirectChat
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
    </div>
  );
}
