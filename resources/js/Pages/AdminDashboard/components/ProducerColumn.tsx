'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { router } from '@inertiajs/react';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export type Producer = {
    id: number;
    name: string;
    email: string;
    products_count: number;
    is_approved: boolean;
    created_at: string;
};

const handleApprovalToggle = (producerId: number, currentStatus: boolean) => {
    router.put(
        route('admin.producers.toggleApproval', producerId),
        { is_approved: !currentStatus },
        {
            onSuccess: () => {
                toast.success(`Producer ${!currentStatus ? 'approved' : 'unapproved'} successfully!`);
            },
            onError: () => {
                toast.error('Failed to update producer approval status.');
            },
        }
    );
};

export const columns: ColumnDef<Producer>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className="hover:bg-transparent pl-0"
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="font-bold text-gray-900 dark:text-gray-100">{row.getValue('name')}</div>
        ),
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className="hover:bg-transparent pl-0"
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase text-gray-600 dark:text-gray-400">{row.getValue('email')}</div>
        ),
    },
    {
        accessorKey: 'products_count',
        header: '# Products',
        cell: ({ row }) => {
            const count = row.getValue('products_count') as number;
            return (
                <div className="text-center">
                    <Badge variant="outline" className="font-semibold">
                        {count} products
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: 'is_approved',
        header: 'Status',
        cell: ({ row }) => {
            const isApproved = row.getValue('is_approved') as boolean;
            return (
                <div className="flex items-center justify-center gap-2">
                    {isApproved ? (
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Approved
                        </Badge>
                    ) : (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                            <XCircle className="mr-1 h-3 w-3" />
                            Pending
                        </Badge>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: 'created_at',
        header: 'Joined',
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
    {
        id: 'actions',
        header: 'Approve',
        cell: ({ row }) => {
            const producer = row.original;
            return (
                <div className="flex items-center justify-center gap-2">
                    <Switch
                        checked={producer.is_approved}
                        onCheckedChange={() => handleApprovalToggle(producer.id, producer.is_approved)}
                        className="data-[state=checked]:bg-emerald-600"
                    />
                </div>
            );
        },
    },
];
