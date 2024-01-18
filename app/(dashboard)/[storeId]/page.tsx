import CardWrapper from "@/components/abstract-comps/card-wrapper";
import Header from "@/components/abstract-comps/header";

const StorePage = ({
    params
}: { params: { storeId: string } }) => {

    const data = [
        {
            id: 23124324
        },
        {
            id: 4353454
        },
        {
            id: 453532424
        },
    ]

    return (
        <div className="my-8">
            <Header title="Overview" description="This is a overview page" />
            <div className="flex flex-wrap justify-center items-center gap-x-5 space-y-5">
                {
                    data.map((item) => (
                        <CardWrapper title="Card 1" description="Card One Description">
                            {item.id}
                        </CardWrapper>
                    ))
                }
            </div>

        </div>
    );
}

export default StorePage;