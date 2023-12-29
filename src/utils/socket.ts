import { Socket } from "socket.io-client";
import io from "socket.io-client";
import config from "../config/config.json";

export const socket: Socket = io(config.SOCKET_URL, { autoConnect: false });

// export async function connect(): Promise<string> {
//   return new Promise((resolve, reject) => {
//     socket = io(config.SOCKET_URL);

//     socket.on("connect", () => {
//       console.log("Socket connected, socket id: ", socket.id);
//       resolve(socket.id);
//     });

//     socket.on("connect_error", (error) => {
//       reject(error);
//     });
//   });
// }
