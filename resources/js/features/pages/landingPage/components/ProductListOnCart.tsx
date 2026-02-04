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
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md"
                onClick={closeProductListOnCart}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="max-h-[90vh] w-full max-w-2xl px-4 md:px-0"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Card className="flex h-full w-full flex-col overflow-hidden rounded-[2.5rem] border-0 bg-white/95 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] backdrop-blur-3xl dark:bg-zinc-900/95">
                        <CardHeader className="border-b border-gray-100 p-8 dark:border-zinc-800">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="flex items-center gap-3 text-3xl font-black text-gray-900 dark:text-white">
                                        <div className="rounded-2xl bg-emerald-600/10 p-3 dark:bg-emerald-500/10">
                                            <MdShoppingCart className="font-bold text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        Your Cart
                                    </CardTitle>
                                    <p className="font-medium text-gray-500 dark:text-gray-400">
                                        You have{' '}
                                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                            {totalItems}
                                        </span>{' '}
                                        items in your selection
                                    </p>
                                </div>
                                <button
                                    onClick={closeProductListOnCart}
                                    className="rounded-2xl bg-gray-100 p-3 text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:hover:text-white"
                                >
                                    <MdCancel className="text-2xl" />
                                </button>
                            </div>
                        </CardHeader>

                        <CardContent className="flex-1 overflow-hidden p-8">
                            {productOnOrderList &&
                            productOnOrderList.length !== 0 ? (
                                <ScrollArea className="h-[450px] pr-6">
                                    <div className="flex flex-col gap-6">
                                        <AnimatePresence mode="popLayout">
                                            {productOnOrderList?.map(
                                                (item, key) => (
                                                    <motion.div
                                                        key={item.id || key}
                                                        layout
                                                        initial={{
                                                            opacity: 0,
                                                            x: -20,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            scale: 0.95,
                                                        }}
                                                        transition={{
                                                            delay: key * 0.05,
                                                        }}
                                                    >
                                                        <CartRow
                                                            product={item}
                                                        />
                                                    </motion.div>
                                                ),
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </ScrollArea>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex h-[450px] flex-col items-center justify-center space-y-4 text-center"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-3xl" />
                                        <MdShoppingCart className="relative animate-pulse text-9xl text-gray-200 dark:text-zinc-800" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        Your cart is empty
                                    </h3>
                                    <p className="max-w-[250px] text-gray-500 dark:text-gray-400">
                                        Explore our market and find amazing
                                        products to fill your cart!
                                    </p>
                                </motion.div>
                            )}
                        </CardContent>

                        {productOnOrderList &&
                            productOnOrderList.length !== 0 && (
                                <CardFooter className="border-t border-gray-100 bg-gradient-to-b from-transparent to-gray-50/50 p-8 dark:border-zinc-800 dark:to-zinc-800/20">
                                    <div className="flex w-full flex-col items-center justify-between gap-6 sm:flex-row">
                                        <div className="space-y-1 text-center sm:text-left">
                                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                                Total Amount
                                            </p>
                                            <p className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-4xl font-black text-transparent">
                                                {totalPrice} MGA
                                            </p>
                                        </div>

                                        <Button
                                            onClick={bloc.confirmOrder}
                                            className="group relative flex w-full items-center justify-center gap-3 rounded-[1.5rem] bg-gradient-to-r from-emerald-600 to-teal-600 px-10 py-8 text-xl font-black text-white shadow-[0_20px_40px_-12px_rgba(16,185,129,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-12px_rgba(16,185,129,0.6)] active:scale-95 sm:w-auto"
                                        >
                                            <MdPayment className="text-2xl group-hover:animate-bounce" />
                                            <span>Purchase</span>
                                            <div className="absolute inset-0 rounded-[1.5rem] bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
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
