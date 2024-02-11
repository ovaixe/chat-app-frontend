import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import config from "../../../../config/config.json";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { username, password } = await req.json();

    const { data: response } = await axios(
      `${config.BACKEND_URL}/api/auth/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: { username, password },
      }
    );

    if (response.isSuccess) {
      const data = response.data;
      return Response.json(data);
    } else throw new Error(response.error);
  } catch (err: any) {
    console.error("[ERROR][api/auth/signup]: ", err.message);
    return Response.json({ error: err.message }, { status: 400 });
  }
}
