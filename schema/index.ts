import * as z from 'zod'


export const registerSchema = z.object({
    name: z.string().min(1, { message: "User name cannot be empty" }),
    email: z.string().min(1),
    password: z.string().min(1)
})

export const storeSchema = z.object({
    storename: z.string().min(1, { message: "Store name cannot be empty" }),
})


export const billboardSchema = z.object({
    label: z.string().min(1, { message: "Billboard name connot be empty" }),
    imageUrl: z.string()
})


