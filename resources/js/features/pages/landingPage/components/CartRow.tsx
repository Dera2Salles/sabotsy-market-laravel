import defaultImage from '@/assets/defaut.jpg';
import type { ProductEntity } from '@/features/product/ProductEntity';
import React from 'react';
import { useProductContext } from '../context/useProductContext';
import { QuantityControl } from './QuantityControl';

interface CardProductProps {
    product: ProductEntity;
}

export const CartRow: React.FC<CardProductProps> = ({ product }) => {
    const bloc = useProductContext();

    return (
        <div className="group relative flex w-full items-center gap-6 rounded-3xl border border-gray-100 bg-white dark:bg-zinc-800/50 p-5 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-green-500/5 hover:-translate-y-1 dark:border-zinc-800">
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl">
                <img
                    src={product.image || defaultImage}
                    alt={product.product_name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex flex-1 flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                        {product.product_name}
                    </h4>
                    <p className="text-sm font-medium text-green-600 dark:text-green-500">
                        {product.category?.name}
                    </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-8">
                    <div className="text-right">
                        <p className="text-xl font-black text-gray-900 dark:text-white">
                            {(product.unit_price as number * (product.unitOnCart as number)).toLocaleString()} MGA
                        </p>
                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tighter">
                            {product.unit_price?.toLocaleString()} MGA × {product.unitOnCart}
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-zinc-900/50 p-2 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-inner">
                        <QuantityControl
                            item={product}
                            quantity={product.unitOnCart as number}
                            onIncrease={() => bloc.addProducToTheOrder(product)}
                            onDecrease={() => bloc.removeProducToTheOrder(product)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
