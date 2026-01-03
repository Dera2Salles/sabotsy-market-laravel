import type { ProductEntity } from '@/features/product/ProductEntity';
import { usePage } from '@inertiajs/react';

export interface InertiaReturnType<T> {
    data: T;
    path: string;
    current_page: number;
    last_page: number;
    total: number;
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    };
}

export const useFetchProductService = (): {
    data: ProductEntity[];
    path: string;
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    };
} => {
    const products: InertiaReturnType<ProductEntity[]> = usePage().props
        .products as InertiaReturnType<ProductEntity[]>;
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
