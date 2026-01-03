import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MdShoppingCart } from 'react-icons/md';
import { QuantityControl } from './QuantityControl';

import type { ProductEntity } from '@/features/product/ProductEntity';
import { useProductContext } from '../context/useProductContext';

import defaut from '@/assets/defaut.jpg';

interface CardProductProps {
    product: ProductEntity;
}

export const CardProduct: React.FC<CardProductProps> = ({ product }) => {
    const bloc = useProductContext();

    const productInCart = bloc.productOnOrder?.OrderItems.find(
        (item) => item.id === product.id,
    );
    return (
        <Card
            className={cn(
                'dark:border-1 w-[350px] transform overflow-hidden rounded-lg border-2 border-green-100 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl md:w-[320px] dark:border-zinc-500 dark:bg-zinc-800',
            )}
        >
            <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                    <img
                        src={product.image ? product.image : defaut}
                        alt={product.product_name}
                        className="h-full w-full object-cover"
                    />
                </div>
            </CardHeader>
            <div className="bg-white p-4 transition-all duration-500 dark:bg-zinc-800">
                <CardTitle className="mb-2 text-2xl font-bold text-green-800 transition-all duration-500 dark:text-amber-100">
                    {product.product_name}
                </CardTitle>
                <p className="mb-4 text-sm text-gray-600 transition-all duration-500 dark:text-gray-300">
                    {product.product_description}
                </p>
                <div className="mb-4 flex items-center justify-between">
                    <p className="text-lg font-semibold text-green-600">
                        {product.unit_price || '0'}.00 MGA
                    </p>
                    <p className="text-sm text-gray-500 transition-all duration-500 dark:text-gray-300">
                        Stock: {product.unit_stock}
                    </p>
                </div>
                <CardFooter className="p-0">
                    <div className="w-full">
                        {productInCart ? (
                            <QuantityControl
                                item={product}
                                quantity={productInCart.unitOnCart as number}
                                onIncrease={() =>
                                    bloc.addProducToTheOrder(product)
                                }
                                onDecrease={() => {
                                    bloc.removeProducToTheOrder(product);
                                }}
                            />
                        ) : (
                            <Button
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 py-2 font-semibold text-white transition-all duration-300 hover:bg-green-800"
                                onClick={() => {
                                    bloc?.addProducToTheOrder(product);
                                }}
                            >
                                <MdShoppingCart className="text-xl" /> Add to
                                cart
                            </Button>
                        )}
                    </div>
                </CardFooter>
            </div>
        </Card>
    );
};
