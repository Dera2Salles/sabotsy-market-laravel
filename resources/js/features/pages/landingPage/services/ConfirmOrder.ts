import { orderRepository } from '@/injection';
import { toast } from 'sonner';

export const confirmOrderService = async () => {
  const result = await orderRepository.confirmOrder();
  if (result.status === 'success') {
    toast.success('🎉 Order Placed Successfully!', {
      description: 'Thank you! Your order has been received and is being processed.',
      className: 'bg-green-600 text-white rounded-[2rem] p-6 shadow-2xl border-0 font-bold',
      duration: 5000,
    });
  } else {
    toast.error('Payment Error', {
      description: 'Something went wrong while processing your order. Please try again.',
      className: 'rounded-[2rem] p-6 font-bold text-red-600',
    });
  }
};
