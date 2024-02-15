import { Socket } from "socket.io-client";
import io from "socket.io-client";
import config from "../config/config.json";
import { AuthUser } from "@/types";

let access_token: string | undefined = "";
let userString = sessionStorage.getItem("user");
if (userString) {
  const user: AuthUser = JSON.parse(userString);
  access_token = user.access_token;
}

const socketOptions = {
  autoConnect: false,
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization: access_token,
      },
    },
  },
};

export let socket: Socket = io(config.SOCKET_URL, socketOptions);

export async function connect(): Promise<string> {
  return new Promise((resolve, reject) => {
    socket = io(config.SOCKET_URL);

    socket.on("connect", () => {
      console.log("Socket connected, socket id: ", socket.id);
      resolve(socket.id);
    });

    socket.on("connect_error", (error) => {
      reject(error);
    });
  });
}
