'use client'
import { useRouter } from "next/navigation"
import { backendless } from "@/lib/api/axios"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthForm, authSchema } from "@/lib/schema/authSchema"

export default function Register() {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<AuthForm>({
        resolver: zodResolver(authSchema)
    })

    async function onSubmit(data: AuthForm) {
        try {
            await backendless.post('/users/register', {
                email: data.email,
                password: data.password,
                role: 'user'
            })
            alert('Register berhasil!')
            router.push('login')
        } catch (error) {
            alert('Register gagal')
            console.error((error as Error).message)
        }
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Register</h1>
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
                    Register
                </button>
            </form>
        </div>
    )
}