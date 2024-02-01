import { db } from "@/lib/db";
import { categorySchema } from "@/schema";
import { NextFetchEvent, NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { storeId: string, categoryId: string } }) {
    try {
        const body = await request.json()

        const validatedFields = categorySchema.safeParse(body);

        if (!validatedFields.success) {
            return new NextResponse("Invalid Category Fields", { status: 400 })
        }

        const { billboardId, name } = validatedFields.data

        const existingCategory = await db.category.findFirst({
            where: {
                id: params.categoryId,
                billboardId: billboardId
            }
        })

        if (!existingCategory) {
            return new NextResponse("Category of this name doesn't exists", { status: 403 })
        }

        const category = await db.category.update({
            where: {
                id: params.categoryId,
                storeId: params.storeId,
            },
            data: {
                name: name,
                billboard: {
                    connect: {
                        id: billboardId
                    }
                }
            }
        })

        return new NextResponse("Category Updated Successfully", { status: 201 })

    } catch (error) {
        return new NextResponse("Something went wrong while updating the Category", { status: 400 })
    }
}

export async function DELETE(request: Request, { params }: { params: { storeId: string, categoryId: string } }) {
    try {
        const existingCategory = await db.category.findFirst({
            where: {
                id: params.categoryId,
                storeId: params.storeId
            }
        })
        if (!existingCategory) {
            return new NextResponse("Category with this name doesn't exists", { status: 400 })
        }

        const deleteCategory = await db.category.delete({
            where: {
                id: params.categoryId,
                storeId: params.storeId
            }
        })

        return new NextResponse("Category deleted successfully", { status: 200 })

    } catch (error) {
        return new NextResponse("Something went wrong while deleting the Category", { status: 400 })
    }
}