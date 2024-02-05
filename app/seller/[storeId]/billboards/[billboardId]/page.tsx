import { db } from "@/lib/db";
import BillboardForm from "./_components/billboard-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Billboards",
    description: "Billboards page",
};

const BillboardPage = async ({ params }: { params: { billboardId: string, storeId: string } }) => {
    let billboard
    if (params.billboardId !== 'new') {


        billboard = await db.billboard.findUnique({
            where: {
                id: params.billboardId
            }
        })

    }
    return (
        <div className="py-8">
            <BillboardForm initialData={billboard} />
        </div>
    );
}

export default BillboardPage;