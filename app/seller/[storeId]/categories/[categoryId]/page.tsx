import Header from "@/components/header";
import CategoryForm from "./_components/category-form";
import { db } from "@/lib/db";

const CategoryPage = async ({ params }: { params: { categoryId: string, storeId: string } }) => {

    let category;

    if (params.categoryId !== 'new') {
        category = await db.category.findUnique({
            where: {
                id: params.categoryId
            }
        })
    }

    const billboard = await db.billboard.findMany({
        where: {
            storeId: params.storeId
        }
    })
    return (
        <div className="flex flex-col space-y-10">
            <Header title="Add Category" description="Add and manage your categories here" />
            <CategoryForm billboards={billboard} initialData={category} />
        </div>
    );
}

export default CategoryPage;