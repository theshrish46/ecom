import BillboardForm from "./_components/billboard-form";

const BillboardPage = ({ params }: { params: { billboardId: string, storeId: string } }) => {
    return (
        <div className="py-8">
            <BillboardForm />
        </div>
    );
}

export default BillboardPage;