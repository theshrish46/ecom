import { db } from "@/lib/db";
import AddProduct from "./_components/add-prodcut";

const ProductPage = async ({
    params
}: { params: { productId: string, storeId: string } }) => {

    const product = await db.product.findUnique({
        where: {
            id: params.storeId
        },
        include: {
            images: true
        }
    })

    if (!product) {
        console.log('no such products')
    }

    const categorys = await db.category.findMany({
        where: {
            storeId: params.storeId
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <AddProduct initialData={product} categorys={categorys} />
            </div>
        </div>
    );
}

export default ProductPage;