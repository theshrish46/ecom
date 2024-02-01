import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProductsPage = ({ params }: { params: { storeId: string } }) => {
    return (
        <div className="py-10 flex justify-between items-center">
            <Header title="All your products" description="Manage edit and add new products here" />
            <Button>
                <Link href={`/seller/${params.storeId}/products/new`}>
                    Add new
                </Link>
            </Button>
        </div>
    );
}

export default ProductsPage;