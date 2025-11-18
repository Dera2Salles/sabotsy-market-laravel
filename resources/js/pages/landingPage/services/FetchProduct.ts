import type { ProductEntity } from '@/features/product/ProductEntity';

import { usePage } from '@inertiajs/react';

export const useFetchProductService = (): ProductEntity[] => {
    const product = usePage().props.products.data;
    console.log('etoooo mandeha', product);
    return product as ProductEntity[];
};
