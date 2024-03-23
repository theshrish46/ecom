"use client";

import { Product } from "@/types";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import Link from "next/link";

interface ProductListProps {
    data: Product
}

const ProductList = ({ data }: ProductListProps) => {
    return (
        <Link
            href={`/products/${data.id}`}
            className="
                    my-1
                    max-w-[230px] min-h-[250px]
                    hover:cursor-pointer
                "
        >
            <Card className="w-full h-full rounded-md flex flex-col justify-between items-center gap-y-2">
                <CardHeader>
                    <CardTitle>{data.productname}</CardTitle>
                </CardHeader>
                <div className="w-full">
                    <Image src={data.images[0]?.url} alt="Image" height={100} width={100} className="w-full h-36" />
                </div>
                <CardFooter className="text-sm">
                    {data.ratings.length}
                    <StarIcon className="text-yellow-700" />
                </CardFooter>
            </Card>
        </Link>
    );
}

export default ProductList;