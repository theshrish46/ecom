"use client";

import useCart from "@/hooks/use-cart-store";
import CartCard from "./cart-card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

const CartClient = () => {

    const items = useCart((state) => state.items)
    const removeAll = useCart((state) => state.removeAll)

    const handleCheckout = async () => {

        try {
            const response = await axios.post(`/api/store/${items[0].storeId}/checkout`, {
                productIds: items.map((item) => item.id)
            })
            removeAll()
            window.location = response.data.url
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="my-10 flex flex-col">

            <div className="flex gap-x-3 justify-end">
                <Button onClick={handleCheckout}>
                    Chekout
                </Button>
                <Button variant={'destructive'} onClick={() => removeAll()}>
                    Remove all
                </Button>
            </div>

            <div className="w-full">
                {
                    items.map((item) => (
                        <CartCard data={item} key={item.id} />
                    ))
                }
            </div>
        </div>
    );
}

export default CartClient;