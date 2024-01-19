"use client";

import Header from "@/components/abstract-comps/header";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./columns";

interface BillboardClientProps {
    data: BillboardColumn[]
}

const BillboardClient = ({
    data
}: BillboardClientProps) => {
    const params = useParams()
    const router = useRouter()
    return (
        <div>
            <Header title={`Billboards (${data.length})`} description="Manage all your billboards" />
            <Button onClick={() => router.push(`/${params.storeId}/billboard/new`)}>
                Add new
            </Button>

            <Separator className="my-4" />
            <DataTable searchKey="label" columns={columns} data={data} />
        </div>
    );
}

export default BillboardClient;