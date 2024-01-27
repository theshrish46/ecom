import * as z from 'zod';


export const registerSchema = z.object({
    name: z.string().min(1, { message: "User name cannot be empty" }),
    email: z.string().min(1, { message: "User email cannot be empty" }),
    password: z.string().min(1, { message: "Password cannot be empty" })
})


export const loginSchema = z.object({
    email: z.string().min(1, { message: "User email cannot be empty" }),
    password: z.string().min(1, { message: "Password cannot be empty" })
})

export const storeSchema = z.object({
    storename: z.string().min(1, { message: "Store name cannot be empty" })
})


export const billboardSchema = z.object({
    label: z.string().min(1, { message: "Billboard Label Cannot be empaty" }),
    imageUrl: z.string()
})

export const categorySchema = z.object({
    name: z.string().min(1, { message: "Category Name cannot be empty" }),
    billboardId: z.string().min(1, { message: "Billboard be empty" })
})