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

    const relatedProducts = await db.product.findMany({
        where: {
            categoryId: product?.categoryId
        },
        include: {
            images: true
        }
    })

    return (
        <div className="container h-full py-10">
            <ProductPageClient data={product} ratings={review} relatedProducts={relatedProducts} />
        </div>
    );
}

export default ProductPage;