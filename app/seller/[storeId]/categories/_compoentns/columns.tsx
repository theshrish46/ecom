"use client"

import { ColumnDef } from "@tanstack/react-table"
import CategoryAction from "./category-action"


export type CategoryColumn = {
    id: string
    billboard: string
    name: string,
    createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "billboard",
        header: "Billboard",
    },
    {
        id: "actions",
        cell: ({ row }) => <CategoryAction data={row.original} />
    }
]
