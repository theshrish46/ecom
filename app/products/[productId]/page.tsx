import { db } from "@/lib/db";
import ProductPageClient from "./_components/product-page-client";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
    const product = await db.product.findFirst({
        where: {
            id: params.productId
        },
        include: {
            images: true,
            category: true,
            store: true
        }
    })
    return (
        <div className="my-4 px-5">
            <ProductPageClient data={product} key={product?.id} />
        </div>
    )
}

export default ProductPage;