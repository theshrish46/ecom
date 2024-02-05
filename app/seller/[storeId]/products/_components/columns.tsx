"use client"

import { ColumnDef } from "@tanstack/react-table"
import ProductAction from "./product-action"


export type ProductColumn = {
    id: string
    name: string
    totalOrder: number
    createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "totalOrder",
        header: "Total Order",
    },
    {
        accessorKey: "createdAt",
        header: "Created On"
    },
    {
        id: "actions",
        cell: ({ row }) => <ProductAction data={row.original} />
    }
]
