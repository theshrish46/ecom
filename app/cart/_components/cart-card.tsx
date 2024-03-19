"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import useCart from "@/hooks/use-cart-store";
import { Product } from "@/types";
import axios from "axios";
import { StarIcon, StarOffIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface CartCartProps {
    data: Product
}

const CartCard = ({ data }: CartCartProps) => {
    const removeItem = useCart((state) => state.removeItem)
    const items = useCart((state) => state.items)
    const cart = useCart()


    const handleCheckout = async () => {

        try {
            const response = await axios.post(`/api/store/${data.storeId}/checkout`, {
                productIds: items.map((item) => item.id)
            })
            cart.removeAll()
            window.location = response.data.url;

        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <div>
            <Card className="max-w-4xl mx-auto flex flex-col justify-between items-start gap-y-2 my-2">
                <CardHeader>
                    <CardTitle>{data.productname}</CardTitle>
                    <CardDescription>
                        {data.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="w-full flex justify-between items-center gap-x-3">
                    <div className="relative aspect-video h-32 w-40 rounded-lg">
                        <Image src={data.images[0].url} alt="Image" fill className="object-fill rounded-lg" />
                    </div>
                    <div className="flex-1">
                        {
                            // items.map((item) => (
                                <div>
                                    {/* {item.id} */}
                                    <div className="flex gap-x-1 items-center">
                                        <span className="text-xl">
                                            4.5
                                        </span>
                                        <StarIcon size={20} className="text-yellow-500" />
                                    </div>
                                </div>
                            // ))
                        }
                    </div>
                </CardContent>
                <CardFooter className="flex gap-x-3 items-center justify-center">
                    <Button variant={'outline'} onClick={handleCheckout}>
                        Checkout
                    </Button>
                    <Button variant={'destructive'} onClick={() => removeItem(data.id)}>
                        Remove
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default CartCard;