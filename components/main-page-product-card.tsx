"use client";

import { Image as ImageType, Product } from "@prisma/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Image from "next/image";
import Link from "next/link";
import useCart from "@/hooks/use-cart-store";
import { MouseEventHandler } from "react";

interface MainPageProductCardProps {
    data: Product & {
        images: ImageType[]
    }
}

const MainPageProductCard = ({
    data
}: MainPageProductCardProps) => {
    const { images } = data
    const cart = useCart()


    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation()
        cart.addItem(data)
    }

    return (
        <>
            <Card className="w-[350px] max-h-[400px] hover:cursor-pointer flex flex-col justify-stretch space-y-3 py-2">
                <Link href={`/products/${data.id}`}>

                    <CardContent className="w-full flex justify-center items-center p-0">
                        <Carousel className="w-full">
                            <CarouselContent className="">
                                {images.map((image, index) => (
                                    <CarouselItem key={index} className="">
                                        <div className="w-full">
                                            <Image
                                                src={image.url}
                                                alt={'product image'}
                                                width={'120'}
                                                height={'80'}
                                                className="w-full max-h-60 rounded-t-lg object-fill"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="mx-14" />
                            <CarouselNext className="mx-14" />
                        </Carousel>
                    </CardContent>

                    <CardHeader className="p-2 my-1">
                        <CardTitle>{data.productname}</CardTitle>
                        <CardDescription>{data.description.slice(0, 50)}...</CardDescription>
                    </CardHeader>
                </Link>

                <CardFooter className="px-4 py-2 w-full">
                    <div className="flex justify-between items-center w-full">
                        <div>
                            {data.price}
                        </div>
                        <div>
                            <Button onClick={onAddToCart}>Add To Cart</Button>
                        </div>
                    </div>
                </CardFooter>
            </Card >
        </>
    );
}

export default MainPageProductCard;