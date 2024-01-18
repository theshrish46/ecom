'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";


const NavItems = () => {
    const pathname = usePathname()
    const params = useParams()
    const ROUTES = [
        {
            label: "Overview",
            href: `/${params.storeId}`,
            active: pathname == `/${params.storeId}`
        },
        {
            label: "Products",
            href: `/${params.storeId}/products`,
            active: pathname == `/${params.storeId}/products`
        },
        {
            label: "Orders",
            href: `/${params.storeId}/orders`,
            active: pathname == `/${params.storeId}/orders`
        },
        {
            label: "Sales",
            href: `/${params.storeId}/sales`,
            active: pathname == `/${params.storeId}/sales`
        },
    ]
    return (
        <div className="hidden md:flex flex-col justify-center items-start space-y-5 my-10
            md:flex-row md:items-center md:space-x-5 md:space-y-0 md:my-0
        ">
            {
                ROUTES.map((item) => (
                    <Link href={item.href} className={cn(item.active ? "text-primary font-semibold" : "text-secondary-foreground font-semibold", "text-lg flex justify-center items-center")}>
                        {item.label}
                    </Link>
                ))
            }
            <Button>Switch to buying</Button>
            <UserButton afterSignOutUrl="/sign-in" />
        </div>
    );
}

export default NavItems;