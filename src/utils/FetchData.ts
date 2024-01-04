import { Room, User } from "@/types";
import axios from "axios";

export async function getAllRooms(): Promise<Room[]> {
  try {
    const { data: resp } = await axios.get(
      "http://localhost:8082/api/chats/all-rooms"
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
