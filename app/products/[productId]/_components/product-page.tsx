"use client";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Image as ImageType, Product, Ratings } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";

interface ProductPageClientProps {
    data: Product & {
        images: ImageType[]
    },
    ratings?: Ratings[]
}

const ProductPageClient = ({ data, ratings }: ProductPageClientProps) => {
    return (
        <div className="container mx-auto mt-8 grid grid-cols-3 gap-12">
            <div className="col-span-2">
                <Carousel>
                    <CarouselContent>
                        {data.images.map((image) => (
                            <CarouselItem>
                                <Image src={image.url} alt="image" width={250} height={500} className="w-full" />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="mx-14" />
                    <CarouselNext className="mx-14" />
                </Carousel>
            </div>

            <div className="flex flex-col justify-center">

                <h1 className="text-4xl font-bold mb-4">{data.productname}</h1>
                <p className="text-gray-700 mb-8">{data.description}</p>

                <div className="flex items-center mb-8">
                    <span className="text-3xl text-blue-500 mr-2">₹{data.price}</span>
                </div>

                <Separator className="mb-4 h-[2px]" />
                <Button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
                    Add to cart
                </Button>
            </div>

            <div className="col-span-3 border-2 border-red-900">
                Related products
            </div>
            <div className="col-span-3 border-2 border-blue-900">
                Review and ratings
            </div>
        </div>
    );
}

export default ProductPageClient;