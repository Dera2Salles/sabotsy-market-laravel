import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

import type { OrderEntity } from '@/features/order/Order';
import type { ProductEntity } from '@/features/product/ProductEntity';

import { filter } from '@/features/product/FilterAndSortProducts';
import { router, usePage } from '@inertiajs/react';
import { addProductToTheOrderService } from '../services/AddProductToTheOrderService';
import { confirmOrderService } from '../services/ConfirmOrder';
import {
    InertiaReturnType,
    useFetchProductService,
} from '../services/FetchProduct';
import { removeProductToTheOrderService } from '../services/RemoveProductToTheOrderService';

export const useProduct = () => {
    const [index, setIndex] = useState<number>(0);
    const { data: productsFromServer, path, meta } = useFetchProductService();

    const [productList, setProductList] =
        useState<ProductEntity[]>(productsFromServer);
    const [productOnOrder, setProductOnOrder] = useState<OrderEntity>();
    const [filterCategory, setFilterCategory] = useState<string>('All');
    const [currentPage, setCurrentPage] = useState<number>(
        meta.current_page || 1,
    );
    const [hasMore, setHasMore] = useState<boolean>(
        meta.current_page < meta.last_page,
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

    const [searchTerm, setSearch] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

    const productListFiltered: ProductEntity[] = filter({
        products: productList,
        searchTerm: debouncedSearchTerm,
        category: filterCategory,
    });

    const { auth, categories } = usePage().props as any;

    const confirmOrder = async () => {
        if (!auth.user) {
            router.get(route("login"));
            return;
        }
        setIsPaymentModalOpen(true);
    };

    const processPayment = async () => {
        setIsProcessingPayment(true);
        // Simulate network delay for payment
        await new Promise(resolve => setTimeout(resolve, 2000));
        await confirmOrderService();
        setIsProcessingPayment(false);
        setIsPaymentModalOpen(false);
    };

    const fetchMoreProducts = async () => {
        if (
            isLoading ||
            !hasMore ||
            productList.length >= (meta?.total ?? productList.length)
        )
            return;

        const nextPage = currentPage + 1;

        try {
            setIsLoading(true);
            router.get(
                path,
                { page: nextPage },
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['products'],
                    onSuccess: (page) => {
                        const newProducts = page.props
                            .products as InertiaReturnType<ProductEntity[]>;
                        const newMeta =
                            (page.props.products as InertiaReturnType<
                                ProductEntity[]
                            >)?.meta ??
                            meta;
                        setProductList((prev) => [
                            ...prev,
                            ...newProducts.data,
                        ]);
                        setCurrentPage(newMeta.current_page);
                        setHasMore(newMeta.current_page < newMeta.last_page);
                        setIsLoading(false);
                    },
                },
            );
        } catch (error) {
            console.error(error);
            setHasMore(false);
            setIsLoading(false);
        }
    };

    const addProducToTheOrder = async (product: ProductEntity) => {
        const result = await addProductToTheOrderService({ product });
        if (result) setProductOnOrder(result);
    };

    const removeProducToTheOrder = async (product: ProductEntity) => {
        const result = await removeProductToTheOrderService({ product });
        if (result) setProductOnOrder(result);
    };

    useEffect(() => {
        const search = debounce(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        search();

        return () => {
            search.cancel();
        };
    }, [searchTerm]);

    return {
        productList,
        fetchMoreProducts,
        addProducToTheOrder,
        productOnOrder,
        productListFiltered,
        setFilterCategory,
        setSearch,
        filterCategory,
        removeProducToTheOrder,
        hasMore,
        isLoading,
        confirmOrder,
        index,
        setIndex,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        isProcessingPayment,
        processPayment,
        categories,
    };
};
