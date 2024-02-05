"use client";

import Image from "next/image";
import logo from '@/public/assets/logo.svg'
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavItems from "./nav-items";
import { UserButton, useAuth } from "@clerk/nextjs";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useCartStore } from "@/hooks/use-cart-store";

const NavBar = () => {
    const count = useCartStore((state) => state.cart.length)

    const pathname = usePathname()
    const sellerMode = pathname.includes('/seller')
    const userMode = pathname.includes('/')
    const { userId } = useAuth()
    return (
        <div className="container mx-auto h-16 flex justify-between items-center">
            <div className="flex justify-center items-center cursor-pointer">
                <Image src={logo} alt="Logo image" className="h-28 w-28 p-0" />
            </div>

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
                <div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant={'outline'}>
                                <HamburgerMenuIcon />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="flex flex-col justify-between items-start w-full">
                            <SheetHeader>
                                <SheetTitle>Cart {count}</SheetTitle>
                                <SheetDescription>Your cart</SheetDescription>
                            </SheetHeader>

                            <div>
                                cart item
                            </div>
                            <div>
                                cart item
                            </div>
                            <div>
                                cart item
                            </div>
                            <div>
                                cart item
                            </div>
                            <div>
                                cart item
                            </div>

                            <SheetFooter>
                                <Button>
                                    Proceed to Pay
                                </Button>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
}

export default NavBar;