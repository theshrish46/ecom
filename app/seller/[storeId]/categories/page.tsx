import { db } from "@/lib/db";
import CategoryClient from "./_compoentns/client";
import { CategoryColumn } from "./_compoentns/columns";
import { format } from "date-fns";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Category",
    description: "Category Page",
  };

const CategoryPage = async ({ params }: { params: { storeId: string } }) => {
    const category = await db.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true
        }
    })

    const formattedCategory: CategoryColumn[] = category.map((item) => ({
        id: item.id,
        name: item.name,
        billboard: item.billboard.name,
        createdAt: format(item.createAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex flex-col space-y-10">
            <div className="flex justify-between items-center">
                <Header title="Categories" description="Create and manage your categories" />
                <Button>
                    <Link href={`/seller/${params.storeId}/categories/new`}>
                        Add new
                    </Link>
                </Button>
            </div>
            <CategoryClient data={formattedCategory} />
        </div>
    );
}

export default CategoryPage;