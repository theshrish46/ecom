'use client';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ToggleLeftIcon } from "lucide-react";

import logo from '@/public/auth-bg/logo.svg'
import Image from "next/image";
import NavItems from "./NavItems";

const MobileNav = () => {
    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button>
                        <ToggleLeftIcon />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetTitle>
                        <Image src={logo} alt="logo" />
                    </SheetTitle>
                    <SheetDescription className="my-2">One place solution to sell all your digital assets and notes</SheetDescription>
                    <SheetHeader>
                        <NavItems />
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default MobileNav;