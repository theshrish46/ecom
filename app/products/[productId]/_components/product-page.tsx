"use client";

import MainPageProductCard from "@/components/main-page-product-card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useCart from "@/hooks/use-cart-store";
import { Image as ImageType, Product, Ratings as RatingsType } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import Ratings from "./ratings";

interface ProductPageClientProps {
    data: Product & {
        images: ImageType[]
    },
    ratings?: RatingsType[],
    relatedProducts?: Product[]
}

const ProductPageClient = ({ data, ratings, relatedProducts }: ProductPageClientProps) => {
    const cart = useCart()
    const handleAddToCart = () => {
        cart.addItem(data)
    }

    return (
        <div className="container grid md:grid-cols-3 gap-y-6">

            <div className="md:col-span-3 grid grid-cols-3 gap-x-10">
                <div className="col-span-2">
                    <Carousel>
                        <CarouselContent>
                            {data.images.map((image) => (
                                <CarouselItem>
                                    <Image
                                        src={image.url}
                                        alt="image"
                                        width={250}
                                        height={500}
                                        className="w-full max-h-[400px] object-fill" />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="mx-14" />
                        <CarouselNext className="mx-14" />
                    </Carousel>
                </div>

                <div className="col-span-1">

                    <h1 className="text-4xl font-bold mb-4">{data.productname}</h1>
                    <p className="text-gray-700 mb-8">{data.description}</p>

                    <div className="flex items-center mb-8">
                        <span className="text-3xl text-blue-500 mr-2">₹{data.price}</span>
                    </div>

                    <Separator className="mb-4 h-[2px]" />
                    <Button
                        onClick={handleAddToCart}
                        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
                        Add to cart
                    </Button>
                </div>
            </div>

            <div className="md:col-span-3">
                <div className="col-span-3">
                    {
                        ratings?.length > 0 && (
                            ratings?.map((item) => (
                                <Ratings data={item} />
                            ))
                        )
                    }
                </div>
                <ScrollArea className="w-full">
                    <div className="w-full flex space-x-5 justify-start items-start">
                        {
                            relatedProducts?.map((item, index) => (
                                <MainPageProductCard data={item} key={index} />
                            ))
                        }
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}

export default ProductPageClient;