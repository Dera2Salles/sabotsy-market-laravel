import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Lock, ShieldCheck } from 'lucide-react';
import { MdCancel } from 'react-icons/md';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isProcessing: boolean;
    totalAmount: string;
}

export const PaymentModal = ({
    isOpen,
    onClose,
    onConfirm,
    isProcessing,
    totalAmount,
}: PaymentModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Card className="overflow-hidden border-0 shadow-2xl overflow-y-auto max-h-[90vh]">
                            <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                                        <ShieldCheck className="w-6 h-6" />
                                        Secure Checkout
                                    </CardTitle>
                                    <button
                                        onClick={onClose}
                                        className="text-white/80 hover:text-white transition-colors"
                                    >
                                        <MdCancel className="text-2xl" />
                                    </button>
                                </div>
                                <CardDescription className="text-emerald-50">
                                    Complete your purchase of {totalAmount} MGA
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="card">Card Number (Mock)</Label>
                                    <div className="relative">
                                        <Input
                                            id="card"
                                            placeholder="4242 4242 4242 4242"
                                            defaultValue="4242 4242 4242 4242"
                                            className="pl-10"
                                            disabled={isProcessing}
                                        />
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiry">Expiry Date</Label>
                                        <Input
                                            id="expiry"
                                            placeholder="MM/YY"
                                            defaultValue="12/25"
                                            disabled={isProcessing}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvc">CVC</Label>
                                        <Input
                                            id="cvc"
                                            placeholder="123"
                                            defaultValue="123"
                                            disabled={isProcessing}
                                        />
                                    </div>
                                </div>
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl flex gap-3 items-start border border-emerald-100 dark:border-emerald-800">
                                    <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5" />
                                    <p className="text-sm text-emerald-800 dark:text-emerald-300">
                                        This is a simulated secure payment for Sabotsy Market. No actual funds will be deducted.
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="p-6 bg-gray-50 dark:bg-zinc-900/50 flex flex-col gap-3">
                                <Button
                                    onClick={onConfirm}
                                    disabled={isProcessing}
                                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 h-12 text-lg font-bold shadow-lg shadow-emerald-500/20"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        `Pay ${totalAmount} MGA`
                                    )}
                                </Button>
                                <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
                                    <Lock className="w-3 h-3" />
                                    End-to-end encrypted
                                </p>
                            </CardFooter>
                        </Card>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
