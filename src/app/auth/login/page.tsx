'use client'
import axios from 'axios'
import { useRouter } from "next/navigation"
import { backendless } from "@/lib/api/axios"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthForm, authSchema } from "@/lib/schema/authSchema"

import { signIn } from 'next-auth/react'

export default function Login() {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<AuthForm>({
        resolver: zodResolver(authSchema)
    })

    async function redirect(role: string) {
        if (role === 'user') {
            router.push('/products')
        } else if (role === 'admin') {
            router.push('/admin/dashboard')
        }
    }

    async function onSubmit(data: AuthForm) {
        try {
            const response = await backendless.post('/users/login', {
                login: data.email,
                password: data.password,
            })

            // sebelum lanjut ke products, kita simpan dulu ke cookies lewat API dari next.js
            await axios.post('/api/auth', {
                token: response.data['user-token'],
                role: response.data.role
            })

            redirect(response.data.role)
        } catch (error) {
            alert('Login gagal')
            console.error((error as Error).message)
        }
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Login</h1>
            <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        className="border p-2 w-full text-black"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        className="border p-2 w-full text-black"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
            <div className="mt-4 text-center">
                <p className="mb-2">Or register with</p>
                <button
                    onClick={() => signIn('google')}
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700 w-full"
                >
                    Continue with Google
                </button>
            </div>
        </div>
    )
}