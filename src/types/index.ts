export interface NewUser {
  userName: string;
  password: string;
}

export interface User {
  userName: string;
  socketId: string;
}
export interface Message {
  userName: string;
  message: string;
  timeSent: Date;
  roomName: string;
}

export interface Room {
  name: string;
  host: User;
  users: User[];
}
