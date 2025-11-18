import type { ProductEntity } from '@/features/product/ProductEntity';
import { usePage } from '@inertiajs/react';

export const useFetchProductService = (): {
    data: ProductEntity[];
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    };
} => {
    const products = usePage().props.products;
    console.log(products);

    return {
        data: products.data as ProductEntity[],
        path: products.path,
        meta: {
            current_page: products.current_page || 1,
            last_page: products.last_page || 1,
            total: products.total || 0,
        },
    };
};
