import { db } from "@/lib/db";
import { billboardSchema } from "@/schema";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { storeId: string, billboardId: string } }) {
    try {
        const existingBillboard = await db.billboard.findFirst({
            where: {
                id: params.billboardId
            }
        })
        if (!existingBillboard) {
            return new NextResponse("No such billboard exists", { status: 400 })
        }

        const body = await request.json()
        const validatedFields = billboardSchema.safeParse(body)

        if (!validatedFields.success) {
            return new NextResponse("Invalid fields")
        }
        const { imageUrl, label } = validatedFields.data

        const updateBillboard = await db.billboard.update({
            where: {
                id: params.billboardId
            },
            data: {
                name: label,
                imageUrl: imageUrl
            }
        })

        return new NextResponse("Billboard updated successfully", { status: 200 })
    } catch (error) {
        return new NextResponse("Something went wrong while updating the billboard", { status: 400 })
    }
}


export async function DELETE(request: Request, { params }: { params: { storeId: string, billboardId: string } }) {
    try {
        const deleteBillboard = await db.billboard.deleteMany({
            where: {
                id: params.billboardId
            }
        })
        return new NextResponse("Deleted the billboard successfully", { status: 200 })

    } catch (error) {
        return new NextResponse("Something went wrong while deleting the billboard", { status: 400 })
    }
}