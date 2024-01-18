import { db } from "@/lib/db";
import CategoryForm from "./[categoryId]/_components/category-form";
import CategoryClient from "./_components/CategoryClient";

const CategoryPage = async ({ params }: { params: { storeId: string } }) => {

    const categories = await db.category.findMany({
        where: {
            storeId: params.storeId
        }
    })
    return (
        <div>
            <CategoryClient categories={categories} />
        </div>
    );
}

export default CategoryPage;