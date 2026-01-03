import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { MdAdd, MdRemove } from 'react-icons/md';

import type { ProductEntity } from '@/features/product/ProductEntity';

interface QuantityControlProps {
    quantity: number;
    item: ProductEntity;
    onIncrease: () => void;
    onDecrease: () => void;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
    item,
    quantity,
    onIncrease,
    onDecrease,
}) => {
    const isMaxQuantity = quantity >= (item.unit_stock || Infinity);

    return (
        <div className="flex w-full items-center justify-between gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                    size="icon"
                    variant="ghost"
                    className="size-12 cursor-pointer rounded-lg border border-green-200/60 bg-white/80 text-green-700 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-red-200/60 hover:bg-red-50/80 hover:text-red-600 hover:shadow-md"
                    onClick={onDecrease}
                >
                    <MdRemove className="text-xl" />
                </Button>
            </motion.div>

            <div className="relative flex-1">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={quantity}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.1, opacity: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 20,
                        }}
                        className="flex flex-col items-center"
                    >
                        <div className="rounded-lg border border-green-200/40 bg-gradient-to-br from-green-500/10 to-green-600/10 px-6 py-3 backdrop-blur-sm">
                            <span className="text-2xl font-bold text-green-800">
                                {quantity}
                            </span>
                        </div>
                        <p className="mt-2 text-xs font-medium tracking-wide text-green-600/60">
                            QUANTITY
                        </p>
                    </motion.div>
                </AnimatePresence>

                {isMaxQuantity && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-1 left-0 right-0"
                    >
                        <div className="mx-auto rounded-md border border-amber-300/50 bg-amber-500 px-3 py-1.5 text-center text-xs font-medium tracking-tight text-white shadow-sm backdrop-blur-sm">
                            MAX STOCK
                        </div>
                    </motion.div>
                )}
            </div>

            <motion.div
                whileHover={{ scale: isMaxQuantity ? 1 : 1.02 }}
                whileTap={{ scale: isMaxQuantity ? 1 : 0.98 }}
            >
                <Button
                    size="icon"
                    variant={isMaxQuantity ? 'ghost' : 'default'}
                    className={`size-12 cursor-pointer rounded-lg transition-all duration-200 ${
                        isMaxQuantity
                            ? 'cursor-not-allowed border border-gray-200/60 bg-gray-100/80 text-gray-400 shadow-sm'
                            : 'border-0 bg-green-600 text-white shadow-md hover:bg-green-700 hover:shadow-lg'
                    } backdrop-blur-sm`}
                    onClick={onIncrease}
                    disabled={isMaxQuantity}
                >
                    <MdAdd className="text-xl" />
                </Button>
            </motion.div>
        </div>
    );
};
