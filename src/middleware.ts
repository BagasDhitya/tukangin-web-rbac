import { getAuth } from "@/lib/cookie/auth";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const data = await getAuth()
    const { pathname } = req.nextUrl

    // protect admin route
    if (pathname.startsWith('/admin')) {
        if (data.role !== 'admin') {
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path'] // hanya cek admin route
}