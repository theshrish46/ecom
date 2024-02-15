"use client";

import { Product } from "@prisma/client";
import Image from "next/image";

interface CartCardProps {
    data: Product
}

const CartCard = ({ data }: CartCardProps) => {
    return (
        <div className="bg-gray-200 w-10/12 mx-auto my-10 px-4 py-3">
            <div className="my-2">
                <Image src={data.images[0].url} alt="Images" width={100} height={100} />
            </div> 
            <div className="text-lg font-medium">
                {data.productname}
            </div>
        </div>
    );
}

export default CartCard