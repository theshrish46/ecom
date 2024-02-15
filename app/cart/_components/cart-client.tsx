"use client";

import useCart from "@/hooks/use-cart-store";
import CartCard from "./cart-card";


const CartClientPage = () => {
    const cart = useCart()
    return (
        <div className="">
            {
                cart.items.length > 0 && (
                    cart.items.map((item) => (
                        <CartCard data={item} key={item.id} />
                    ))
                )
            }
        </div>
    );
}

export default CartClientPage;