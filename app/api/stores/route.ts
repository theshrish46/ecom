import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db"


export async function POST(request: Request) {
    console.log('inside the api')
    try {
        const body = await request.json();
        const { storename } = body

        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthorized User", { status: 403 })
        }

        if (!storename) {
            return new NextResponse("Name is Required", { status: 400 })
        }

        const existingStore = await db.store.findFirst({
            where: {
                storename: storename,
            }
        })

        if (existingStore) {
            return new NextResponse(`Store with ${storename} already exists`, { status: 400 })
        }

        const store = await db.store.create({
            data: {
                storename: storename,
                userId: userId,
            }
        })

        return NextResponse.json(store)
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }
}