"use client";

import { Image as ImageType, Product } from "@prisma/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface MainPageProductCardProps {
    data: Product & {
        images: ImageType[]
    }
}

const MainPageProductCard = ({
    data
}: MainPageProductCardProps) => {
    const { images } = data

    return (

        <Link href={`/products/${data.id}`}>
            <Card className="w-[350px] hover:cursor-pointer flex flex-col justify-stretch items-start space-y-3">

                <CardContent className="w-full flex justify-center items-center p-0">
                    <Carousel className="w-full">
                        <CarouselContent className="">
                            {images.map((image, index) => (
                                <CarouselItem key={index} className="">
                                    <div className="w-full h-full">
                                        <Image
                                            src={image.url}
                                            alt={'product image'}
                                            width={'120'}
                                            height={'80'}
                                            className="w-full h-full rounded-t-lg"
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

                <CardFooter className="px-4 py-2 w-full">
                    <div className="flex justify-between items-center w-full">
                        <div>
                            {data.price}
                        </div>
                        <div>
                            <Button>Add To Cart</Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}

export default MainPageProductCard;