import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { data: response } = await axios.get(
      `${process.env.BACKEND_URL}/api/chats/all-rooms`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.isSuccess) {
      const data = response.data;
      return Response.json(data);
    } else throw new Error(response.error);
  } catch (err: any) {
    console.error("[ERROR][api/chats/all-rooms]: ", err);
    return Response.json({ error: err.message }, { status: 400 });
  }
}
