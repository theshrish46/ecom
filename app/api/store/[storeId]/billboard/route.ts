import { db } from "@/lib/db"
import { billboardSchema } from "@/schema"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = await auth()
        const body = await request.json()

        const validatedFields = billboardSchema.safeParse(body)

        if (!validatedFields.success) {
            return new NextResponse("Invalid fields")
        }
        const store = await db.store.findMany({
            where: {
                id: params.storeId,
            }
        })

        if (!store) {
            return new NextResponse("No store exists please create a store to add a billboard")
        }
        const { imageUrl, label } = validatedFields.data

        const billboard = await db.billboard.create({
            data: {
                name: label,
                imageUrl: imageUrl,
                store: {
                    connect: {
                        id: params.storeId
                    }
                }
            }
        })

        return new NextResponse("Billboard created")



    } catch (error) {
        console.log('[BILLBOARD ID POST ERROR]', error)
        return new NextResponse("Error occured", { status: 400 })
    }
}