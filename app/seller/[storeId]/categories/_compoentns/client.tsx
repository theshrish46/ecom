"use client";

import { DataTable } from "@/components/data-table";
import { columns, CategoryColumn } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

interface CategoryClientProps {
    data: CategoryColumn[]
}

const CategoryClient = ({ data }: CategoryClientProps) => {
    const params = useParams()
    return (
        <div className="flex flex-col space-y-10">
            <DataTable data={data} columns={columns} />
        </div>
    );
}

export default CategoryClient;