"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import useCart from "@/hooks/use-cart-store";


interface SheetProductPageProps {
    data?: Product
}

const SheetProductPage = ({
    data
}: SheetProductPageProps) => {
    const cart = useCart()
    const removeCartItem = (id: string) => {
        cart.removeItem(id)
    }

    return (
        <>
            <li className="h-full flex justify-start items-start w-full py-6">
                <div className="w-full relative rounded-md overflow-hidden flex justify-between items-start">
                    <div className="flex flex-col justify-between items-start space-y-1">
                        <div className="text-sm font-semibold tracking-wider mb-2">{data?.productname}</div>
                        <div>
                            <Image
                                src={data?.images[0].url}
                                alt="Image"
                                width={50}
                                height={50}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-between items-end">
                        <div className="text-sm font-medium">
                            ₹ {data?.price}
                        </div>
                        <Button
                            onClick={() => removeCartItem(data?.id)}
                            variant={'destructive'}
                            size={'sm'}
                            className="my-2 p-2">
                            <Trash size={10} />
                        </Button>
                    </div>
                </div>
            </li>
            <Separator />
        </>
    );
}

export default SheetProductPage;