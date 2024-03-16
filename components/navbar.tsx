"use client";

import Image from "next/image";
import logo from '@/public/assets/logo.svg'
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavItems from "./nav-items";
import { UserButton, useAuth } from "@clerk/nextjs";
import { ShoppingCart } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import SheetProductPage from "./sheet-product-cart";
import { ScrollArea } from "./ui/scroll-area";

import emptycart from '@/public/assets/emptycart.svg'
import { cn } from "@/lib/utils";
import useCart from "@/hooks/use-cart-store";

const NavBar = () => {
    const cart = useCart()
    const pathname = usePathname()
    const sellerMode = pathname.includes('/seller')
    const userMode = pathname.includes('/')
    const { userId } = useAuth()

    const handleEmptyCart = () => {
        cart.removeAll()
    }

    return (

        <div className="container mx-auto h-16 flex justify-between items-center">
            <Link href={'/'} className="flex justify-center items-center cursor-pointer">
                <Image src={logo} alt="Logo image" className="h-28 w-28 p-0" />
            </Link>

            <div>
                {
                    sellerMode ? (
                        <NavItems />
                    ) : (
                        <div>Something else</div>
                    )
                }
            </div>
            <div className="flex justify-between items-center space-x-5">
                <div>
                    <Button variant={'outline'} className="bg-primary/10 font-medium">
                        {
                            sellerMode ? (
                                <>
                                    <Link href={'/'}>
                                        Exit Seller Mode
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href={'/seller'}>
                                        Become a seller
                                    </Link>
                                </>
                            )
                        }
                    </Button>
                </div>
                <div>
                    {
                        userId ? (
                            <div>
                                <UserButton />
                            </div>
                        ) : (
                            <div>
                                <Button>
                                    <Link href={'/sign-in'}>
                                        Login
                                    </Link>
                                </Button>
                            </div>
                        )
                    }
                </div>
                {
                    !sellerMode && (

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant={'outline'} className="">
                                    <ShoppingCart />
                                    {cart.items.length}
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="flex flex-col justify-between items-start w-full">
                                <SheetHeader>
                                    <SheetTitle>Cart {cart.items.length}</SheetTitle>
                                    <SheetDescription>Your cart</SheetDescription>
                                </SheetHeader>

                                <ScrollArea className="w-full h-full">
                                    <div className="">
                                        {
                                            cart.items.length > 0 ? (
                                                cart.items.map((item, index) => (
                                                    <SheetProductPage data={item} key={index} />
                                                ))
                                            ) : (
                                                <div className="">
                                                    <Image src={emptycart} alt="Image" className="" />
                                                </div>
                                            )
                                        }
                                    </div>
                                </ScrollArea>

                                <SheetFooter className="w-full">
                                    <div className="w-full flex justify-between items-center">
                                        <Link className={cn(buttonVariants({ variant: 'outline' }), "border-2 border-red-900")} href={'/cart'}>
                                            Proceed to Pay
                                        </Link>
                                        <Button variant={'destructive'} onClick={handleEmptyCart} className="border-2 border-red-900">
                                            Empty Cart
                                        </Button>
                                    </div>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    )
                }
                <div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;