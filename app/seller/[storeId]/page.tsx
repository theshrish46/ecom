import StoreForm from "./_components/store-form";

const StorePage = ({ params }: { params: { storeId: string } }) => {
    return (
        <div className="w-full h-full">
            {
                params.storeId == 'new' ? (
                    <div>
                        <StoreForm />
                    </div>
                ) : (
                    <div>
                        {params.storeId} Page
                        <div>
                            Other overivew of the store like sales and all
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default StorePage;