'use server'
import { cookies } from "next/headers"

export async function setAuth(token: string, role: string) {
    const cookie = await cookies()
    cookie.set('auth_token', token, { httpOnly: true, path: '/' })
    cookie.set('auth_role', role, { httpOnly: true, path: '/' })
}

export async function getAuth() {
    const cookie = await cookies()
    const token = cookie.get('auth_token')?.value
    const role = cookie.get('auth_role')?.value
    return { token, role }
}

export async function clearAuth() {
    const cookie = await cookies()
    cookie.delete('auth_token')
    cookie.delete('auth_role')
}