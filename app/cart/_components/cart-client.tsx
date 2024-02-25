"use client";

import useCart from "@/hooks/use-cart-store";
import CartCard from "./cart-card";
import Image from "next/image";
import emptycart from '@/public/assets/emptycart.svg'
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";


const CartClientPage = () => {
    const [phNo, setPhNo] = useState("")
    const [address, setAddress] = useState("")
    const cart = useCart()
    const storeId = cart.items[0].id
    const items = useCart((state) => state.items)

    const redirectToPay = async () => {
        const response = await axios.post(`/api/store/${storeId}/checkout`, {
            productIds: items.map((item) => item.id),
            phNo: phNo,
            address: address
        })
        window.location = response.data.url
    }

    return (
        <div className="h-full flex flex-col justify-center items-center">
            {
                cart.items.length > 0 ? (
                    <div className="flex justify-center items-center gap-x-3 self-end my-2">
                        <div>
                            <Textarea value={address} onChange={(e) => setAddress(e.target.value)}>
                                Address
                            </Textarea>
                            <Input value={phNo} onChange={(e) => setPhNo(e.target.value)} placeholder="Ph no" />
                        </div>
                        <Button
                            variant={'outline'}
                            onClick={redirectToPay}
                        >Checkout</Button>

                        <Button
                            variant={'destructive'}
                            onClick={() => cart.removeAll()}
                        >Remove all</Button>
                    </div>
                ) : (
                    null
                )
            }

            {
                cart.items.length > 0 ? (
                    cart.items.map((item) => {
                        return (
                            <>
                                <CartCard productData={item} key={item.id} />
                            </>
                        )
                    })

                ) : (
                    <div className="flex flex-col justify-center items-center space-y-5">
                        <Image src={emptycart} alt="Image" width={500} height={500} />
                        <Link href={'/'} className={cn(buttonVariants({ variant: 'link' }))} >
                            <h1 className="text-xl text-blue-700">Continue with shopping!</h1>
                        </Link>
                    </div>
                )
            }
        </div>
    );
}

export default CartClientPage;