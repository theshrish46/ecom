"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const NavItems = () => {
    const pathname = usePathname()
    const params = useParams()

    const routes = [
        {
            label: "Overview",
            href: "/overview",
            active: pathname === `/${params.storeId}/overview`
        },
        {
            label: "Products",
            href: "/products",
            active: pathname === `/${params.storeId}/products`
        },
        {
            label: "Categories",
            href: "/categories",
            active: pathname === `/${params.storeId}/categories`
        },
        {
            label: "Billboards",
            href: "/billboards",
            active: pathname === `/${params.storeId}/billboards`
        },
        {
            label: "Sales",
            href: "/sales",
            active: pathname === `/${params.storeId}/sales`
        },
    ]
    return (
        <div className="flex justify-center items-center space-x-3">
            {routes.map((item) => (
                <Link href={`/seller/${params.storeId}/${item.href}`} className="text-sm">
                    {item.label}
                </Link>
            ))}
        </div>
    );
}

export default NavItems;