import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    const { productIds, phNo, address } = await req.json()
    console.log("Inside the api")
    console.log(productIds)
    console.log(typeof productIds)

    if (!productIds || productIds.length === 0) {
        return new NextResponse("Product id are required", { status: 400 })
    }

    const products = await db.product.findMany({
        where: {
            id: {
                in: productIds
            }
        }
    })

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []


    products.map((item) => {
        console.log(item.price)
        console.log(typeof item.price)
    })

    products.forEach((product) => {
        line_items.push({
            quantity: 1,
            price_data: {
                currency: "INR",
                product_data: {
                    name: product.productname,
                },
                unit_amount: product.price * 100,
            }
        })
    })

    const order = await db.order.create({
        data: {
            storeId: params.storeId,
            address: address,
            phoneNo: phNo,
            isPaid: false,
            orderItems: {
                create: productIds.map((productId: string) => ({
                    product: {
                        connect: {
                            id: productId
                        }
                    }
                }))
            }
        }
    })

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        phone_number_collection: {
            enabled: true,
        },
        success_url: `${process.env.STRIPE_SUCCESS_URL}/cart/success`
    })
    return NextResponse.json({
        url: session.url
    }, {
        headers: corsHeaders
    })
}