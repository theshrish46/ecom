"use client"

import { Category, Product } from "@/types";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";

interface CategoryListProps {
    data: Category
}

const CategoryList = ({ data }: CategoryListProps) => {

    const handleCategory = (category: string) => {
        const search = useSearchParams()
        search.append()

    }

    return (
        <div>
            <Button
                key={data.id}
                className="text-gray-900 font-medium text-sm bg-gray-200 my-2 px-2 py-1.5 rounded-md inline-block hover:bg-gray-300"
                onClick={() => handleCategory(data.name)}
            >
                {data.name}
            </Button></div>
    );
}

export default CategoryList;