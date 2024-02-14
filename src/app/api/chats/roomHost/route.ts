import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const roomName = req.nextUrl.searchParams.get("roomName");
    const [type, access_token] =
      req.headers.get("Authorization")?.split(" ") ?? [];

    if (type !== "Bearer") throw new Error("Invalid access token");

    const { data: response } = await axios.get(
      `${process.env.BACKEND_URL}/api/chats/room-host/${roomName}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.isSuccess) {
      const data = response.data;
      return Response.json(data);
    } else throw new Error(response.error);
  } catch (err: any) {
    console.log("[ERROR][api/chats/room-host]: ", err.message);
    return Response.json({ error: err.message }, { status: 400 });
  }
}
