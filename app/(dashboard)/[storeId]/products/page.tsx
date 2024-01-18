import ProductClient from "./_components/product-client";


const ProductsPage = () => {
    return (
        <div className="flex-col my-8">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient />
            </div>

        </div>
    );
}

export default ProductsPage;