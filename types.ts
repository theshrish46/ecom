export interface Product {
    id: string,
    productname: string,
    description: string,
    storeId: string,
    price: string,
    isFeatured: boolean,
    category: Category,
    images: Image[],
    ratings: Rating,
    store: Store
}

export interface Store {
    id: string,
    storename: string,
}

export interface Image {
    id: string,
    url: string
}

export interface Rating {
    id: string,
    ratings: number,
    reviews: string,
    productId: string,
}

export interface Category {
    id: string,
    name: string,
    billboardId: string
}

export interface Billboard {
    id: string,
    name: string,
}