import { QuantityControl } from './QuantityControl';

import type { ProductEntity } from '@/features/product/ProductEntity';
import { useProductContext } from '../context/useProductContext';

import defaut from '@/assets/defaut.jpg';

interface CardProductProps {
    product: ProductEntity;
}

export const CartRow: React.FC<CardProductProps> = ({ product }) => {
    const bloc = useProductContext();

    return (
        <div className="flex w-full items-center gap-4 rounded-lg border-2 border-gray-100 bg-white p-4 text-gray-800 shadow-md transition-all duration-300 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-200">
            <img
                src={product.image ? product.image : defaut}
                alt={product.product_name}
                className="h-20 w-20 rounded-md object-cover"
            />
            <div className="grid flex-1 grid-cols-3 items-center gap-4">
                {/* Column 1: Name & Category */}
                <div>
                    <p className="text-lg font-bold text-green-800 dark:text-amber-100">
                        {product.product_name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {product.category?.name}
                    </p>
                </div>
                {/* Column 2: Price & Quantity in Cart */}
                <div className="text-center">
                    <p className="font-semibold text-green-600">
                        {product.unit_price || '0'}.00 MGA
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {product.unitOnCart} in cart
                    </p>
                </div>
                {/* Column 3: Quantity Control */}
                <div className="flex justify-end">
                    <QuantityControl
                        item={product}
                        quantity={product.unitOnCart as number}
                        onIncrease={() => bloc.addProducToTheOrder(product)}
                        onDecrease={() => bloc.removeProducToTheOrder(product)}
                    />
                </div>
            </div>
        </div>
    );
};
