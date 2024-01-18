import { db } from "@/lib/db";
import BillboardClient from "./_components/BillboardClient";

const BillBoardsPage = async ({ params }: { params: { storeId: string } }) => {

    const billboards = await db.billboards.findMany({
        where: {
            storeId: params.storeId
        }
    })

    return (
        <div>
            <BillboardClient billboards={billboards} />
        </div>
    );
}

export default BillBoardsPage;