"use client";

import { BillboardColumn, columns } from "./columns";
import { DataTable } from "../../../../../components/data-table";

interface BillboardClientProps {
    data: BillboardColumn[]
}

const BillboardClient = ({ data }: BillboardClientProps) => {
    return (
        <div className="container p-0">
            <DataTable data={data} columns={columns} />
        </div>
    );
}

export default BillboardClient;