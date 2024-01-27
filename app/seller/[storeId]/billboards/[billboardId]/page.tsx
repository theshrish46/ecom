import { db } from "@/lib/db";
import BillboardForm from "./_components/billboard-form";

const BillboardPage = async ({ params }: { params: { billboardId: string, storeId: string } }) => {
    const initialBillboard = await db.billboard.findUnique({
        where: {
            id: params.billboardId
        }
    })
    return (
        <div className="py-8">
            <BillboardForm initialData={initialBillboard} />
        </div>
    );
}

export default BillboardPage;