import { db } from "@/lib/db";
import ProductForm from "./_components/product-form";

const ProductPage = async ({ params }: { params: { storeId: string, productId: string } }) => {
    let initialData;
    if (params.productId !== 'new') {
        initialData = await db.product.findMany({
            where: {
                id: params.productId
            },
            include: {
                Image: true
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