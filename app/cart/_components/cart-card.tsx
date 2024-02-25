"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart-store";
import { Product, Image as ImageType } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { use, useEffect } from "react";
import { toast } from "sonner";

interface CartCardProps {
    productData: Product & {
        images: ImageType[]
    }
}

const CartCard = ({ productData }: CartCardProps) => {

    const cart = useCart()
    const removeAll = useCart((state) => state.removeAll)
    const items = useCart((state) => state.items)
    const searchParams = useSearchParams()

    useEffect(() => {
        if (searchParams.get('success')) {
            toast.success("Payment completed")
            removeAll()
        }

        if (searchParams.get('cancel')) {
            toast.error("Something went wrong")
        }
    }, [searchParams, removeAll])


    const redirectToCheckout = async () => {
        const response = await axios.post(`/api/store/${productData.storeId}/checkout`, {
            productIds: items.map((item) => item.id)
        })
        window.location = response.data.url

    }




    return (
        <div className="bg-gray-200/50 w-8/12 mx-auto my-4 px-4 py-3 flex justify-between items-start rounded-lg">
            <div className="w-full flex justify-start items-start space-x-10">
                <div className="my-2">
                    <Image src={productData.images[0].url} alt="Images" width={300} height={300} className="object-fill max-h-52"/>
                </div>

                <div className="flex flex-col justify-start items-start space-y-5">
                    <div className="flex justify-between items-center w-full">
                        <Link href={`/products/${productData.id}`} className="text-lg font-medium">
                            {productData.productname}
                        </Link>

                        <div className="text-xs">id: {productData.id}</div>
                    </div>
                    <div>{productData.description}</div>
                    <div className="text-lg font-semibold">₹{productData.price}</div>
                    <div className="flex space-x-3">
                        <Button
                            onClick={redirectToCheckout}
                        >Pay</Button>
                        <Button variant={'destructive'} onClick={() => { cart.removeItem(productData.id) }}>Remove</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartCard