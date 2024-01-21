import { Button } from "@/components/ui/button";
import { useStoreModal } from "@/hooks/use-store-modal";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";


const SellerPage = async () => {
    const { userId } = auth()
    const store = await db.store.findMany({
        where: {
            userId: userId as string,
        }
    })
    return (
        <div>
            {
                store.map((item) => (
                    <Link href={`/seller/${item.id}`} className="px-2 py-4 border-2 border-gray-400 shadow-md w-[400px] flex justify-center items-start flex-col space-y-3">
                        <div>{item.id}</div>
                        <div>{item.userId}</div>
                        <div>{item.storename}</div>
                    </Link>
                ))
            }

            <Button>
                Create a new one
            </Button>
        </div>
    )

}

export default SellerPage;