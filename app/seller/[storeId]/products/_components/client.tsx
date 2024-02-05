"use client";

import { DataTable } from "@/components/data-table";
import { Product } from "@prisma/client";
import { columns } from './columns'


interface ProductClientProps {
    data: Product[]
}

const ProductClient = ({ data }: ProductClientProps) => {

    return (
        <div>
            <DataTable data={data} columns={columns} />
        </div>
    );
}

export default ProductClient;