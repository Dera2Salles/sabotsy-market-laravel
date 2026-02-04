'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { type ColumnDef } from '@tanstack/react-table';
import { Package } from 'lucide-react';
import toast from 'react-hot-toast';

export type Order = {
    id: number;
    product: {
        product_name: string;
        image: string;
    };
    quantity: number;
    total_price: number;
    status: string;
    created_at: string;
};

const STATUS_OPTIONS = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { value: 'processing', label: 'Processing', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { value: 'shipped', label: 'Shipped', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { value: 'delivered', label: 'Delivered', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800 border-red-200' },
];

const getStatusColor = (status: string) => {
    const statusOption = STATUS_OPTIONS.find(opt => opt.value === status.toLowerCase());
    return statusOption?.color || 'bg-gray-100 text-gray-800 border-gray-200';
};

const handleStatusUpdate = (orderId: number, newStatus: string) => {
    router.put(
        route('producer.orders.updateStatus', orderId),
        { status: newStatus },
        {
            onSuccess: () => {
                toast.success(`Order status updated to ${newStatus}!`);
            },
            onError: () => {
                toast.error('Failed to update order status.');
            },
        }
    );
};

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: 'id',
        header: 'Order ID',
        cell: ({ row }) => (
            <div className="font-bold text-gray-900 dark:text-gray-100">
                #{row.getValue('id')}
            </div>
        ),
    },
    {
        accessorKey: 'product',
        header: 'Product',
        cell: ({ row }) => {
            const product = row.original.product;
            return (
                <div className="flex items-center gap-3">
                    {product?.image ? (
                        <div className="h-10 w-10 rounded-lg overflow-hidden border border-gray-100 dark:border-zinc-800">
                            <img
                                src={product.image}
                                alt={product.product_name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                            <Package className="h-5 w-5 text-gray-400" />
                        </div>
                    )}
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                        {product?.product_name || 'N/A'}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'quantity',
        header: 'Quantity',
        cell: ({ row }) => (
            <div className="text-center font-medium">
                {row.getValue('quantity')} units
            </div>
        ),
    },
    {
        accessorKey: 'total_price',
        header: 'Total Price',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('total_price'));
            return (
                <div className="text-right font-bold text-gray-900 dark:text-gray-100">
                    {amount.toLocaleString()} MGA
                </div>
            );
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string || 'pending';
            const orderId = row.original.id;
            
            return (
                <Select
                    defaultValue={status.toLowerCase()}
                    onValueChange={(value) => handleStatusUpdate(orderId, value)}
                >
                    <SelectTrigger className={`w-[140px] border ${getStatusColor(status)}`}>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {STATUS_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                <div className="flex items-center gap-2">
                                    <div className={`h-2 w-2 rounded-full ${option.color.split(' ')[0].replace('bg-', 'bg-')}`} />
                                    {option.label}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
        },
    },
    {
        accessorKey: 'created_at',
        header: 'Order Date',
        cell: ({ row }) => {
            const date = new Date(row.getValue('created_at'));
            return (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    {date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </div>
            );
        },
    },
];
