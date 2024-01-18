"use client";

import Header from "@/components/abstract-comps/header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Category } from "@prisma/client";
import { useParams, usePathname, useRouter } from "next/navigation";



interface CategoryClientProps {
    categories: Category[]
}

const CategoryClient = ({
    categories
}: CategoryClientProps) => {
    const params = useParams()
    const router = useRouter()
    return (
        <>
            <div className="flex items-center justify-between">
                <Header title="Category" description="Create your own categories" />
                <Button onClick={() => router.push(`/${params.storeId}/category/new`)}>Add new</Button>
            </div>
            <Separator />
            
        </>
    );
}

export default CategoryClient;