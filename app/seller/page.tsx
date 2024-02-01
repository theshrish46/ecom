import { Button } from "@/components/ui/button";
import { useStoreModal } from "@/hooks/use-store-modal";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { use, useEffect } from "react";


const SellerPage = async ({ params }: { params: { storeId: string } }) => {

    const { userId } = await auth()
    
    const store = await db.store.findMany({
        where: {
            userId: userId as string,
        }
    })
    return (
        <div>
            {
                store?.map((item) => (
                    <Link key={item.id} href={`/seller/${item.id}`} className="px-2 py-4 border-2 border-gray-400 shadow-md w-[400px] flex justify-center items-start flex-col space-y-3">
                        <div>{item.id}</div>
                        <div>{item.userId}</div>
                        <div>{item.storename}</div>
                    </Link>
                ))
            }

            <Button>
                <Link href={`/seller/new`}>
                    Create a new one
                </Link>
            </Button>
        </div>
    )

}

export default SellerPage;