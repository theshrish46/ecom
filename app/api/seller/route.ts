import { db } from "@/lib/db";
import { storeSchema } from "@/schema";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    return NextResponse.json({ msg: "Ok seller" })
}

export async function POST(request: Request) {
    try {
        const { userId } = auth()
        console.log(userId)

        if (!userId) {
            return new NextResponse("Unauthorized user")
        }

        const body = await request.json()
        console.log(body)

        const validatedFields = storeSchema.safeParse(body)
        if (!validatedFields.success) {
            return new NextResponse("Invalid fields")
        }

        const { storename } = validatedFields.data

        const existingStore = await db.store.findMany({
            where: {
                storename: storename
            }
        })

        if (existingStore) {
            return new NextResponse("Store name already taken try something new")
        }

        const store = await db.store.create({
            data: {
                storename: storename,
                userId: userId
            }
        })
        console.log(store)
        return new NextResponse("Store created")

    } catch (error) {
        console.log('[STORE POST ERROR IN API]', error)
    }
}