
const StorePage = ({ params }: { params: { storeId: string } }) => {
    return (
        <div>
            Store Page
            {params.storeId}
        </div>
    );
}

export default StorePage;