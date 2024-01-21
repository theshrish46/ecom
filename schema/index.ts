import * as z from 'zod'
export const storeSchema = z.object({
    storename: z.string().min(1, { message: "Store name cannot be empty" }),
})