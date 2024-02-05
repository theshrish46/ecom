import { db } from "@/lib/db";
import ProductForm from "./_components/product-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Product",
    description: "Add and manage the products",
  };

const ProductPage = async ({ params }: { params: { productId: string, storeId: string } }) => {
    let initialData;
    if (params.productId !== 'new') {
        initialData = await db.product.findUnique({
            where: {
                id: params.productId
            },
            include: {
                images: true
            }
        })

    }
    const category = await db.category.findMany({
        where: {
            storeId: params.storeId
        }
    })

    return (
        <div>
            <ProductForm initialData={initialData} category={category} />
        </div>
    );
}

export default ProductPage;