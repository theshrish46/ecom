import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: '2023-10-16'
})

export async function POST(req: NextRequest) {
    const { data } = await req.json()
    const { prince } = data

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(prince) * 100,
            currency: "INR"
        })

        return new NextResponse(paymentIntent.client_secret, { status: 200 })
    } catch (error) {
        return new NextResponse("Something went wrong while processing the payments", { status: 400 })
    }
}