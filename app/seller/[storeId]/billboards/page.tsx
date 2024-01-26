import { Button } from "@/components/ui/button";
import BillboardClient from "./_components/client";
import Header from "@/components/header";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { db } from "@/lib/db";
import { BillboardColumn } from "./_components/columns";
import { format } from 'date-fns'


const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
    const billboard = await db.billboard.findMany({
        where: {
            storeId: params.storeId
        }
    })

    const formattedBillboard: BillboardColumn[] = billboard.map((item) => ({
        id: item.id,
        label: item.name,
        createdAt: format(item.createAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex flex-col justify-start items-start space-y-3">
            <div className="w-full flex justify-between items-center">
                <Header title="Billboard" description="This is a billboard page. You  can add and edit your billboards here." />
                <Button className="flex justify-around items-center">
                    <Link href={`/seller/${params.storeId}/billboards/new`} className="font-semibold flex justify-around items-center space-x-1">
                        <span>Add new</span>
                        <PlusIcon />
                    </Link>
                </Button>
            </div>
            <BillboardClient data={formattedBillboard} />
        </div>
    );
}

export default BillboardsPage;