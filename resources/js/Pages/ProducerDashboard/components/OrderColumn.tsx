'use client';

import { Button } from '@/components/ui/button';
import { type ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: 'id',
        header: 'Order ID',
        cell: ({ row }) => <div className="font-medium">#{row.getValue('id')}</div>,
    },
    {
        accessorKey: 'product.name',
        header: 'Product',
        cell: ({ row }) => {
            const product = row.original.product;
            return <div>{product ? product.name : 'N/A'}</div>;
        },
    },
    {
        accessorKey: 'quantity',
        header: 'Quantity',
        cell: ({ row }) => <div className="text-center">{row.getValue('quantity')}</div>,
    },
    {
        accessorKey: 'total_price',
        header: 'Total Price',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('total_price'));
            return <div className="text-right font-medium">{amount.toLocaleString()} MGA</div>;
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
            <div className="capitalize text-center">{row.getValue('status') || 'Pending'}</div>
        ),
    },
    {
        accessorKey: 'created_at',
        header: 'Date',
        cell: ({ row }) => {
            return <div className="text-center">{new Date(row.getValue('created_at')).toLocaleDateString()}</div>;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return (
                <Button variant="outline" size="sm">
                    View
                </Button>
            );
        },
    },
];
