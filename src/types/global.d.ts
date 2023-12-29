import { User } from "./index";

export {};

declare global {
  interface Message {
    userName: string;
    message: string;
    timeSent: Date;
    roomName: string;
  }
}
