'use client';

import Image from "next/image";

import logo from '@/public/auth-bg/logo.svg'
import { Separator } from "@/components/ui/separator";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const DashBoardNavbar = () => {
    return (
        <div className="h-16 flex justify-between items-center">
            <div>
                <Link href={'/'}>
                    <Image src={logo} alt="logo" />
                </Link>
            </div>
            <div>
                <NavItems />
                <MobileNav />
            </div>
            {/* <div>
                <UserButton afterSignOutUrl="/sign-in" />
            </div> */}
        </div>
    );
}

export default DashBoardNavbar;