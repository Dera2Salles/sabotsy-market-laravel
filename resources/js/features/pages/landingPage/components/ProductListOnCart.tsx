import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimatePresence, motion } from 'framer-motion';
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
    const totalItems = bloc.productOnOrder?.OrderTotalItemUnit || 0;

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
                transition={{ duration: 0.4 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
                onClick={closeProductListOnCart}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="max-h-[90vh] w-full max-w-2xl px-4 md:px-0"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Card
                        className="flex h-full w-full flex-col rounded-[2.5rem] bg-white/95 dark:bg-zinc-900/95 border-0 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] backdrop-blur-3xl overflow-hidden"
                    >
                        <CardHeader className="p-8 border-b border-gray-100 dark:border-zinc-800">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="flex items-center gap-3 text-3xl font-black text-gray-900 dark:text-white">
                                        <div className="p-3 bg-green-600/10 dark:bg-green-500/10 rounded-2xl">
                                            <MdShoppingCart className="text-green-600 dark:text-green-400 font-bold" />
                                        </div>
                                        Your Cart
                                    </CardTitle>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                                        You have <span className="text-green-600 dark:text-green-400 font-bold">{totalItems}</span> items in your selection
                                    </p>
                                </div>
                                <button
                                    onClick={closeProductListOnCart}
                                    className="rounded-2xl p-3 bg-gray-100 dark:bg-zinc-800 text-gray-400 transition-all hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-gray-900 dark:hover:text-white"
                                >
                                    <MdCancel className="text-2xl" />
                                </button>
                            </div>
                        </CardHeader>

                        <CardContent className="flex-1 p-8 overflow-hidden">
                            {productOnOrderList &&
                            productOnOrderList.length !== 0 ? (
                                <ScrollArea className="h-[450px] pr-6">
                                    <div className="flex flex-col gap-6">
                                        <AnimatePresence mode="popLayout">
                                            {productOnOrderList?.map((item, key) => (
                                                <motion.div
                                                    key={item.id || key}
                                                    layout
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ delay: key * 0.05 }}
                                                >
                                                    <CartRow product={item} />
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </ScrollArea>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex h-[450px] flex-col items-center justify-center text-center space-y-4"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
                                        <MdShoppingCart className="relative text-9xl text-gray-200 dark:text-zinc-800 animate-pulse" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        Your cart is empty
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 max-w-[250px]">
                                        Explore our market and find amazing products to fill your cart!
                                    </p>
                                </motion.div>
                            )}
                        </CardContent>

                        {productOnOrderList && productOnOrderList.length !== 0 && (
                            <CardFooter className="p-8 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-zinc-800/20 border-t border-gray-100 dark:border-zinc-800">
                                <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-6">
                                    <div className="space-y-1 text-center sm:text-left">
                                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                            Total Amount
                                        </p>
                                        <p className="text-4xl font-black bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                                            {totalPrice} MGA
                                        </p>
                                    </div>

                                    <Button
                                        onClick={bloc.confirmOrder}
                                        className="group relative flex w-full sm:w-auto items-center justify-center gap-3 rounded-[1.5rem] bg-gradient-to-r from-green-600 to-teal-600 px-10 py-8 text-xl font-black text-white shadow-[0_20px_40px_-12px_rgba(5,150,105,0.4)] transition-all duration-300 hover:shadow-[0_24px_48px_-12px_rgba(5,150,105,0.6)] hover:-translate-y-1 active:scale-95"
                                    >
                                        <MdPayment className="text-2xl group-hover:animate-bounce" />
                                        <span>Purchase</span>
                                        <div className="absolute inset-0 rounded-[1.5rem] bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
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
