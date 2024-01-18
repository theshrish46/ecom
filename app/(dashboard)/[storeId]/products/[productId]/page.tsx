import { db } from "@/lib/db";
import AddProduct from "./_components/add-prodcut";

const ProductPage = async ({
    params
}: { params: { productId: string, storeId: string } }) => {

    const product = await db.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            images: true
        }
    })

    if (!product) {
        console.log('no such products')
    }

    const category = await db.category.findMany({
        where: {
            storeId: params.storeId
        }
    })

    return (
        <div className="flex-col">
            Dynamic Product Page
            {params.storeId}
            <div className="flex-1">

            </div>
            <AddProduct initialData={product} category={category} />
        </div>
    );
}

export default ProductPage;