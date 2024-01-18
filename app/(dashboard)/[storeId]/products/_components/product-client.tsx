"use client";

import Header from "@/components/abstract-comps/header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";


const ProductClient = () => {
    const router = useRouter();
    const params = useParams()
    return (
        <div>
            <Header title="Products Page" description="Add and manage your products here" />
            <Button
                variant={'outline'}
                size={'sm'}
                onClick={() => router.push(`/${params.storeId}/products/new`)}
            >
                <Plus />
            </Button>
        </div>
    )
}

export default ProductClient;