import { db } from "@/lib/db"
import { productSchema } from "@/schema"
import { NextResponse } from "next/server"

export async function PATCH(request: Request, { params }: { params: { productId: string, storeId: string } }) {
    try {
        const body = await request.json()

        const validatedFields = productSchema.safeParse(body)

        if (!validatedFields.success) {
            return new NextResponse("Invalid fields", { status: 400 })
        }

        const { categoryId, description, images, name, price, productUrl, isArchived, isFeatured } = validatedFields.data

        const existingProduct = await db.product.findUnique({
            where: {
                id: params.productId,
                storeId: params.storeId
            }
        })
        if (!existingProduct) {
            return new NextResponse("Product with this id doesn't exists", { status: 400 })
        }


        await db.product.update({
            where: {
                id: params.productId,
            },
            data: {
                productname: name,
                price: price,
                description: description,
                isArchived: isArchived,
                isFeatured: isFeatured,
                productUrl: productUrl,
                category: {
                    connect: {
                        id: categoryId
                    }
                },
                store: {
                    connect: {
                        id: params.storeId
                    }
                },
                images: {
                    deleteMany: []
                }
            }
        })

        await db.product.update({
            where: {
                id: params.productId,
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        })

        return new NextResponse("Product updated", { status: 200 })
    } catch (error) {
        console.log("[PRODUCT PUT ERROR]", error)
        return new NextResponse("Something went wrong while updating the product", { status: 400 })
    }
}


export async function DELETE(request: Request, { params }: { params: { productId: string, storeId: string } }) {
    try {

        const product = await db.product.findUnique({
            where: {
                id: params.productId
            }
        })

        if (!product) {
            return new NextResponse("Product with this id doesn't exists", { status: 400 })
        }

        const deletedProduct = await db.product.delete({
            where: {
                id: params.productId
            }
        })

    } catch (error) {
        return new NextResponse("Something went wrong while deleteing the product", { status: 400 })
    }
}