"use client";

import Header from "@/components/abstract-comps/header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Billboards } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

interface BillboardClientProps {
    billboards: Billboards[]
}

const BillboardClient = ({
    billboards
}: BillboardClientProps) => {
    const params = useParams()
    const router = useRouter()
    return (
        <div>
            <Header title="Billboards" description="Manage all your billboards" />
            <Button onClick={() => router.push(`/${params.storeId}/billboard/new`)}>
                Add new
            </Button>
            <Separator />
        </div>
    );
}

export default BillboardClient;