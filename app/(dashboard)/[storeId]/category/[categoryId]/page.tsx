import { db } from "@/lib/db";
import CategoryForm from "./_components/category-form";

const CategoryPage = async ({ params }: { params: { storeId: string, categoryId: string } }) => {
    const categories = await db.category.findMany({
        where: {
            storeId: params.storeId
        }
    })
    const billboards = await db.billboards.findMany({
        where: {
            storeId: params.storeId
        }
    })
    return (
        <div>
            <CategoryForm categories={categories} billboards={billboards} />
        </div>
    );
}

export default CategoryPage;