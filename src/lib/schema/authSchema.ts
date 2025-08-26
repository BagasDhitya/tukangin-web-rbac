import { z as zod } from 'zod'

export const authSchema = zod.object({
    email: zod.email('Email tidak valid'),
    password: zod.string().min(6, 'Password minimal 6 karakter')
})

export type AuthForm = zod.infer<typeof authSchema>