export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface ProductEntity {
    id?: string | number;
    user_id?: string | number;
    unit_price: number;
    unit_stock: number;
    unitOnCart?: number;
    product_name: string;
    category?: Category;
    category_id: number;
    image?: string;
    product_description: string;
}
