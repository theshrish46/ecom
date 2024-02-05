import { db } from "@/lib/db";
import { productSchema } from "@/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { storeId: string } }) {
    try {
        const body = await request.json()

        const validatedFields = productSchema.safeParse(body)

        if (!validatedFields.success) {
            return new NextResponse("Invalid fields.", { status: 400 })
        }

        const { name, description, images, productUrl, price, isArchived, categoryId, isFeatured } = validatedFields.data;

        const exisingProduct = await db.product.findFirst({
            where: {
                productname: name
            }
        })

        if (exisingProduct) {
            return new NextResponse("Product with this name already exists.", { status: 400 })
        }

        const product = await db.product.create({
            data: {
                productname: name,
                description: description,
                price: price,
                isArchived: isArchived as boolean,
                isFeatured: isFeatured as boolean,
                productUrl: productUrl,
                store: {
                    connect: {
                        id: params.storeId
                    }
                },
                category: {
                    connect: {
                        id: categoryId
                    }
                },
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        })

        return new NextResponse("Product created", { status: 201 })
    } catch (error) {
        return new NextResponse("Something went wrong while creating the product", { status: 400 })
    }
}