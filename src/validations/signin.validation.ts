import {z} from 'zod'

export const schema = z.object({
    email : z.string().email({message : 'invalid email format'}),
    password : z.string().min(6, {message : 'password must be at least 6 characters long'}),
})

export type SignInSchemaType = z.infer<typeof schema>