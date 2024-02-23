import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { username, password } = await req.json();
    
    const { data: response } = await axios(
      `${process.env.BACKEND_URL}/api/auth/login`,
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
    console.error("[ERROR][api/auth/login]: ", err.message);
    return Response.json({ error: err.message }, { status: 400 });
  }
}
