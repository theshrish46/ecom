import { db } from "@/lib/db";
import ProductPageClient from "./_components/product-page";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
    const product = await db.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            images: true
        }
    })

    const review = await db.ratings.findMany({
        where: {
            productId: params.productId
        }
    })

    return (
        <div className="container">
            <ProductPageClient data={product} ratings={review} />
        </div>
    );
}

export default ProductPage;