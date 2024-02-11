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

export interface AuthUser {
  userName?: string;
  access_token?: string;
  socketId?: string | null;
  roomName?: string | null;
}

export interface AuthContextValue {
  user?: AuthUser | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (newUser: AuthUser) => void;
}
