import { db } from "@/lib/db";
import { categorySchema } from "@/schema";
import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { storeId: string } }) {
    try {
        const body = await request.json();
        const validatedFields = categorySchema.safeParse(body)

        if (!validatedFields.success) {
            return new NextResponse("Invalid Fields")
        }

        const { billboardId, name } = validatedFields.data

        const existingCategory = await db.category.findFirst({
            where: {
                name: name
            }
        })

        if (existingCategory) {
            return new NextResponse("Category with this name already exists try something new")
        }

        const category = await db.category.create({
            data: {
                name: name,
                billboard: {
                    connect: {
                        id: billboardId
                    }
                },
                store: {
                    connect: {
                        id: params.storeId
                    }
                }
            }
        })
        console.log(category)

        return new NextResponse("Category created successfully")

    } catch (error) {
        console.log("[CATEGORY POST API ERROR]", error)
        return new NextResponse("Something went wrong while posting the category")
    }
}