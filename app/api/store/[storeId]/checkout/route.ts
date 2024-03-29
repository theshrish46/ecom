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

    try {
        const { productIds } = await req.json()

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
                phoneNo: "",
                address: "",
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
            billing_address_collection: "required",
            phone_number_collection: {
                enabled: true,
            },
            success_url: `${process.env.NEXT_PUBLIC_URL}/cart/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart/cancel`,
            metadata: {
                orderId: order.id,
                another: "test",
                message: "Before the webhook and inside the checkout route.ts"
            }
        })
        return NextResponse.json({
            url: session.url
        }, {
            headers: corsHeaders
        })
    } catch (error) {
        return new NextResponse("Something went wrong while checking", {
            status: 400
        })
    }
}