"use client"

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import useCart from "@/hooks/use-cart-store";
import { Product } from "@/types";
import { ShoppingBag, Star, StarIcon } from "lucide-react";
import Image from "next/image";

interface ProductPageProps {
    data: Product
}

const ProductPageClient = ({ data }: ProductPageProps) => {
    const cart = useCart()

    return (
        <div className="w-full mx-auto  grid sm:grid-cols-3">
            <div className="w-full sm:col-span-2 sm:grid sm:grid-cols-2 gap-2">
                {
                    data.images.map((image) => (
                        <div className="relative aspect-square w-full">
                            <Image src={image.url} alt="Image" fill className="object-fill" />
                        </div>
                    ))
                }
            </div>

            <div className="w-full mx-auto px-4">
                <h2 className="text-xl sm:text-4xl font-medium tracking-normal my-4">{data.productname}</h2>
                <p className="text-lg leading-5 tracking-normal my-3">{data.description}</p>

                <div className="my-4">
                    <div className="flex justify-start items-center my-4">
                        {
                            data.ratings ? (
                                <span>{data.ratings.ratings}</span>
                            ) : (
                                <div className="text-base text-gray-900 flex justify-center items-center gap-x-1">
                                    <span>No Reviews Yet</span>
                                    <StarIcon size={20} className="text-yellow-500/100" />
                                </div>
                            )
                        }
                    </div>
                    <Separator className="h-[2.5px]" />
                </div>
                <div>
                    <p className="text-4xl font-medium">$ {data.price}</p>
                    <p className="text-green-700 font-semibold">Inclusive of all taxes</p>
                </div>
                <Button
                    onClick={() => cart.addItem(data)}
                    className="
                        w-full my-4
                        flex justify-center items-center gap-x-3
                    "
                >
                    <div>
                        Add to Cart
                    </div>
                    <ShoppingBag />
                </Button>

                <Separator className="h-[2.5px]" />

                <div className="my-4">
                    <h2 className="uppercase">Ratings</h2>

                    <div className="flex flex-col justify-center items-center my-4">
                        {/* <span className="text-5xl">{data?.ratings?.ratings?.length}</span> */}
                        <span className="text-5xl">345</span>
                        <span>Happy Customers</span>
                    </div>

                    <div>
                        <div
                            className="
                                my-4
                                flex flex-col justify-center items-start gap-y-1
                            "
                        >
                            {/* <span>{data?.ratings?.reviews}</span> */}
                            <span className="text-sm text-gray-800 font-extralight">{data.id}</span>
                            <span className="text-gray-900 font-medium">It is really a great product. You won't regret it. Just go for it</span>
                        </div>
                    </div>
                </div>

                <Separator />

                <div className="my-4">
                    <h2 className="text-center text-xl my-2">Seller Information</h2>
                    <div className="flex flex-col">
                        <div className="text-sm text-gray-800 font-light">
                            Store ID: <span className="text-base text-gray-900 font-medium">{data.store.storename}</span>
                        </div>
                        <div className="text-sm text-gray-800 font-light">
                            Category: <span className="text-base text-gray-900 font-medium">{data.category.name}</span>
                        </div>
                    </div>
                </div>


            </div>

        </div >
    )
}

export default ProductPageClient;