import { NextResponse } from "next/server";
import { setAuth } from "@/lib/cookie/auth";

export async function POST(req: Request) {
    const { token, role } = await req.json()
    await setAuth(token, role)
    return NextResponse.json({ success: true })
}