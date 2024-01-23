import { Room, User } from "@/types";
import config from "../config/config.json";
import axios from "axios";

export async function getAllRooms(): Promise<Room[]> {
  try {
    const { data: resp } = await axios.get(
      `${config.BACKEND_URL}/api/chats/all-rooms`
    );
    if (resp.isSuccess) {
      return resp.data;
    } else {
      console.log("[ERROR][FetchData:getAllRooms]: ", resp.error);
      throw new Error(resp.error);
    }
  } catch (err: any) {
    console.log("[ERROR][FetchData:getAllRooms]: ", err);
    throw new Error("Something went wrong, Please try again!");
  }
}

export async function getRoomHost(roomName: string) {
  try {
    const userString: string | null = sessionStorage.getItem("user");
    if (!userString) return;

    const user = JSON.parse(userString);
    const { data: resp } = await axios.get(
      `${config.BACKEND_URL}/api/chats/room-host/${roomName}`,
      {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      }
    );
    if (resp.isSuccess) {
      return resp.data;
    } else {
      console.log("[ERROR][FetchData:getRoomHost]: ", resp.error);
      throw new Error(resp.error);
    }
  } catch (err: any) {
    console.log("[ERROR][FetchData:getRoomHost]: ", err.message);
  }
}
