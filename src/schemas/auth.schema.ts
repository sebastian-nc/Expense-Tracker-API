import z from 'zod';


export const LoginSchema = z.object({
    body: z.object({
        email: z.email().trim().toLowerCase(),
        password: z.string().min(6)
    })
})

export const RegisterSchema = z.object({
    body: z.object({
        name: z.string().min(2),
        email: z.email().trim().toLowerCase(),
        password: z.string().min(6)
    })
})

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;