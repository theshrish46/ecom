import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductClient from "./_components/client";
import { db } from "@/lib/db";
import { ProductColumn } from "./_components/columns";
import { format } from "date-fns";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Products",
    description: "Manage the products",
};

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {


    const product = await db.product.findMany({
        where: {
            storeId: params.storeId
        }
    })

    const formattedProducts: ProductColumn[] = product.map((item) => ({
        id: item.id,
        name: item.productname,
        totalOrder: item.totalOrder,
        createdAt: format(item.createAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex flex-col py-10 space-y-10">
            <div className="flex justify-between items-center">
                <Header title="All your products" description="Manage edit and add new products here" />
                <Button>
                    <Link href={`/seller/${params.storeId}/products/new`}>
                        Add new
                    </Link>
                </Button>
            </div>

            <ProductClient data={formattedProducts} />
        </div>
    );
}

export default ProductsPage;