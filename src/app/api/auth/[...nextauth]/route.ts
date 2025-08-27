import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!
        })
    ],
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60
    },
    jwt: {
        maxAge: 60 * 60, // harus sama biar konsisten (1 jam)
    },
    pages: {
        signIn: '/auth/register' // halaman register kita
    },
    callbacks: {
        async redirect({ }) {
            return "/products"
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }