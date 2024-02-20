"use client";

import useCart from "@/hooks/use-cart-store";
import CartCard from "./cart-card";
import Image from "next/image";
import emptycart from '@/public/assets/emptycart.svg'
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";


const CartClientPage = () => {
    const cart = useCart()
    return (
        <div className="h-full flex flex-col justify-center items-center">
            {
                cart.items.length > 0 ? (
                    cart.items.map((item) => (
                        <CartCard productData={item} key={item.id} />
                    ))
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