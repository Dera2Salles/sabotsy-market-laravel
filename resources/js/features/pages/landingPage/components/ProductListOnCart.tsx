import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { MdCancel, MdPayment, MdShoppingCart } from 'react-icons/md';
import { CartRow } from './CartRow';

import type { ProductEntity } from '@/features/product/ProductEntity';
import { useModalContext } from '../context/useModalContext';
import { useProductContext } from '../context/useProductContext';

import { PaymentModal } from './PaymentModal';

export const ProductListOnCart = () => {
    const { closeProductListOnCart } = useModalContext();
    const bloc = useProductContext();
    const productOnOrderList: ProductEntity[] | undefined =
        bloc?.productOnOrder?.OrderItems;
    const totalPrice =
        bloc.productOnOrder?.OrderItemsTotalPrice?.toFixed(2) || '0.00';

    return (
        <>
            <PaymentModal
                isOpen={bloc.isPaymentModalOpen}
                onClose={() => bloc.setIsPaymentModalOpen(false)}
                onConfirm={bloc.processPayment}
                isProcessing={bloc.isProcessingPayment}
                totalAmount={totalPrice}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                onClick={closeProductListOnCart}
            >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="max-h-[90vh] w-[700px]"
            >
                <Card
                    className="flex h-full w-full flex-col rounded-2xl bg-gray-50 shadow-2xl dark:bg-zinc-900"
                    onClick={(e) => e.stopPropagation()}
                >
                    <CardHeader className="border-b p-6 dark:border-zinc-800">
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-3 text-2xl font-bold text-green-800 dark:text-amber-100">
                                <MdShoppingCart className="text-3xl" />
                                Your Cart
                            </CardTitle>
                            <button
                                onClick={closeProductListOnCart}
                                className="rounded-full p-2 text-gray-400 transition-colors hover:text-gray-700 dark:hover:text-gray-200"
                            >
                                <MdCancel className="text-2xl" />
                            </button>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 p-6">
                        {productOnOrderList &&
                        productOnOrderList.length !== 0 ? (
                            <ScrollArea className="h-[450px] pr-4">
                                <div className="flex flex-col gap-4">
                                    {productOnOrderList?.map((item, key) => (
                                        <CartRow product={item} key={key} />
                                    ))}
                                </div>
                            </ScrollArea>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex h-full flex-col items-center justify-center text-center"
                            >
                                <MdShoppingCart className="text-8xl text-gray-300 dark:text-zinc-700" />
                                <h3 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
                                    Your cart is empty
                                </h3>
                                <p className="mt-2 text-gray-500 dark:text-gray-400">
                                    Add some items to get started
                                </p>
                            </motion.div>
                        )}
                    </CardContent>

                    {productOnOrderList && productOnOrderList.length !== 0 && (
                        <CardFooter className="border-t bg-white p-6 dark:border-zinc-800 dark:bg-zinc-800/50">
                            <div className="flex w-full items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Total
                                    </p>
                                    <p className="text-3xl font-bold text-green-700 dark:text-green-500">
                                        {totalPrice} MGA
                                    </p>
                                </div>

                                <Button
                                    onClick={bloc.confirmOrder}
                                    className="flex items-center gap-2 rounded-lg bg-green-700 px-6 py-3 text-lg font-bold text-white transition-all duration-300 hover:bg-green-800"
                                >
                                    <MdPayment className="text-2xl" />
                                    <span>Purchase</span>
                                </Button>
                            </div>
                        </CardFooter>
                    )}
                </Card>
            </motion.div>
        </motion.div>
        </>
    );
};
