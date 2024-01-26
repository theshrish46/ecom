import StoreForm from "./_components/store-form";

const StorePage = ({ params }: { params: { storeId: string } }) => {
    return (
        <div className="w-full h-full">
            {params.storeId} Page
            <StoreForm />
        </div>
    );
}

export default StorePage;