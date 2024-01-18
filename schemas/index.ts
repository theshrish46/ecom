import * as z from 'zod';

export const storeSchema = z.object({
    storename: z.string(),
})

export const categorySchema = z.object({
    categoryname: z.string(),
    storeId: z.string(),
    billboardId: z.string(),
})

export const billboardSchema = z.object({
    label: z.string(),
    imageUrl: z.string(),
    storeId: z.string()
})

export const productSchema = z.object({
    productname: z.string(),
    images: z.object({ url: z.string() }).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchive: z.boolean().default(false).optional(),
})