import { Room, User } from "@/types";

export async function getAllRooms(): Promise<Room[]> {
  try {
    const response = await fetch(`/api/chats/allRooms`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      return response.json();
    } else {
      const { error } = await response.json();
      throw new Error(error);
    }
  } catch (err: any) {
    console.error("[ERROR][FetchData:getAllRooms]: ", err);
    throw new Error(err?.message || err);
  }
}

export async function getRoomHost(roomName: string): Promise<User | null> {
  try {
    const userString: string | null = sessionStorage.getItem("user");

    if (!userString) throw new Error("User not found");

    const user = JSON.parse(userString);

    const response = await fetch(`/api/chats/roomHost?roomName=${roomName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access_token}`,
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      const { error } = await response.json();
      throw new Error(error);
    }
  } catch (err: any) {
    console.log("[ERROR][FetchData:getRoomHost]: ", err.message);
    return null;
  }
}
