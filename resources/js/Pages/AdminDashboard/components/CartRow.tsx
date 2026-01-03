import type { ProductEntity } from '@/features/product/ProductEntity';
import {
    MdCategory,
    MdEdit,
    MdMonetizationOn,
    MdProductionQuantityLimits,
} from 'react-icons/md';

import defaut from '@/assets/defaut.jpg';
import { ApiSource } from '@/core/constant';

interface CardProductProps {
    product: ProductEntity;
    onCallBack: (product: ProductEntity) => void;
}

export const CartRow: React.FC<CardProductProps> = ({
    product,
    onCallBack,
}) => {
    return (
        <div className="bg-card text-card-foreground rounded-4xl shadow-2xs flex w-full flex-row items-center justify-between gap-10 border-4 px-5 py-5">
            <div className="gap-15 flex w-full justify-between">
                <div className="flex">
                    <img
                        src={
                            product.image
                                ? `${ApiSource.local}/product/stream/${product.image}`
                                : defaut
                        }
                        alt={product.name}
                        className="size-45 rounded-2xl"
                    />
                </div>
                <div className="flex flex-col justify-center gap-2">
                    <div className="flex gap-2">
                        <MdCategory className="text-2xl text-yellow-500" />
                        <div className="flex gap-1">
                            {' '}
                            <p className="text-xl font-bold">Product : </p>
                            <p className="text-lg">{product?.name}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <MdCategory className="text-2xl text-yellow-500" />
                        <div className="flex gap-1">
                            {' '}
                            <p className="text-xl font-bold">Category : </p>
                            <p>{product.category}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <MdMonetizationOn className="text-2xl text-yellow-500" />
                        <div className="flex gap-1">
                            {' '}
                            <p className="text-xl font-bold">Price : </p>
                            <p className="text-lg">
                                {product?.price || '0'}.00 MGA per unit
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <MdProductionQuantityLimits className="text-2xl text-yellow-500" />
                        <div className="flex gap-1">
                            {' '}
                            <p className="text-xl font-bold">Unit: </p>
                            <p className="text-lg">{product?.unit}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <button
                        className="flex rounded-2xl bg-green-700 hover:bg-green-900"
                        onClick={() => onCallBack(product)}
                    >
                        <div className="flex items-center justify-center gap-1 px-4 py-2">
                            <MdEdit className="text-xl text-white" />{' '}
                            <p className="text-xl text-white">Edit</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};
