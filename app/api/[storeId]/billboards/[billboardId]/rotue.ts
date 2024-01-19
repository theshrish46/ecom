import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function DELETE(request: Request, { params }: { params: { billboardId: string, storeId: string } }) {
    console.log('inside teh api route')
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthenticated User", { status: 400 })
        }

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId: userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthenticated user trying to delete the billboard", { status: 402 })
        }

        const billboard = await db.billboards.delete({
            where: {
                id: params.billboardId,
            }
        })

        if (!billboard) {
            return new NextResponse("No such billboard exists", { status: 403 })
        }

        return NextResponse.json(billboard)

    } catch (error) {
        console.log("[API DELETE ERROR]", error)
    }
}