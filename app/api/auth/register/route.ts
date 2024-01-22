import { db } from "@/lib/db"
import { hashPassword } from "@/lib/hashes"
import { registerSchema } from "@/schema"
import { NextResponse } from "next/server"


export async function POST(request: Request) {
    const body = await request.json()
    console.log(body)

    const validateSchema = await registerSchema.safeParse(body)
    if (!validateSchema.success) {
        return new NextResponse("Invalid field entries", { status: 400 })
    }

    const existingUser = await db.user.findFirst({
        where: {
            email: body.email
        }
    })

    if (existingUser) {
        return new NextResponse("User with this email already exists!", { status: 401 })
    }

    const hashedPassword = await hashPassword(body.password)

    const user = await db.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: hashedPassword
        }
    })

    if (!user) {
        return new NextResponse("Something went wrong while creating the user", { status: 500 })
    }

    const formattedUser = {
        id: user.id,
        name: user.name,
        email: user.email
    }

    return NextResponse.json(formattedUser)

}