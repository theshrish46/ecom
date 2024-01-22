import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("User doesn't exists. Please login", { status: 403 })
        }

        if (!params.storeId) {
            return new NextResponse("You must have a store to create the billboards", { status: 400 })
        }

        const body = await request.json()
        const { label, imageUrl } = body

        if (!label || !imageUrl) {
            return new NextResponse("All fields are compulsory", { status: 402 })
        }

        const existingBillboard = await db.billboard.findMany({
            where: {
                storeId: params.storeId
            }
        })

        if (existingBillboard) {
            return new NextResponse("Billboard with this name already exists. Please try something new", { status: 400 })
        }

        const billboard = await db.billboard.create({
            data: {
                label: label,
                imageUrl: imageUrl,
                storeId: params.storeId,
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        return new NextResponse("Something went wrong whle creating the billboard", { status: 400 })
    }
}