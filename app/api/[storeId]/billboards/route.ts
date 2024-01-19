import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function POST(request: Request, { params }: { params: { storeId: string } }) {
    console.log('inside the api')
    try {
        const { userId } = auth()
        const body = await request.json()
        const { label, imageUrl } = body

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 })
        }

        if (!label) {
            return new NextResponse("Label required", { status: 400 })
        }

        if (!imageUrl) {
            return new NextResponse("Image Url required", { status: 400 })
        }

        const storeById = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId: userId
            }
        })

        if (!storeById) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        const billboard = await db.billboards.create({
            data: {
                label: label,
                iamgeUrl: imageUrl,
                storeId: params.storeId,
            }
        })

        return NextResponse.json(billboard)


    } catch (error) {
        console.log('[BILLBOARD POST ERROR]', error)
        return new NextResponse("Something wen wrong")
    }
}