import Header from "@/components/abstract-comps/header";
import BillboardForm from "./_components/billboard-form";

const BillBoardPage = ({ params }: { params: { storeId: string, billboardId: string } }) => {
    return (
        <div>
            <Header title="Billboard" description="Add new Billboards" />
            <BillboardForm />
        </div>
    );
}

export default BillBoardPage;