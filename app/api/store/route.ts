import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("No user found please login")
        }

        const boday = await request.json()
        const { storename } = boday

        const existingStore = await db.store.findFirst({
            where: {
                storename: storename
            }
        })

        if (existingStore) {
            return new NextResponse("Store name already exists try something new")
        }

        const store = await db.store.create({
            data: {
                storename: storename,
                userId: userId
            }
        })

        if (!store) {
            return new NextResponse("Something went wrong while creating the store")
        }

        return NextResponse.json(store)

    } catch (error) {
        console.log('[CREATE STORE POST ERROR]', error)
    }
}