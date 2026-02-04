import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export type Product = {
    id: string;
    product_name: string;
    unit_price: number;
    unit_stock: number;
    image: string;
    product_description: string;
    created_at: string;
};

// Helper function to calculate product age
const getProductAge = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
};

// Formatting currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) => {
            const image = row.getValue('image') as string;
            return (
                <div className="h-12 w-12 rounded-lg overflow-hidden border border-gray-100 dark:border-zinc-800">
                    <img
                        src={image}
                        alt="Product"
                        className="h-full w-full object-cover"
                    />
                </div>
            );
        },
    },
    {
        accessorKey: 'product_name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="hover:bg-transparent pl-0"
                >
                    Product Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="font-medium text-gray-900 dark:text-gray-100">{row.getValue("product_name")}</div>,
    },
    {
        accessorKey: 'unit_price',
        header: 'Price',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('unit_price'));
            return <div className="font-medium">{formatCurrency(amount)}</div>;
        },
    },
    {
        accessorKey: 'unit_stock',
        header: 'Stock',
        cell: ({ row }) => {
            const stock = parseInt(row.getValue('unit_stock'));
            return (
                <Badge variant={stock > 0 ? "outline" : "destructive"} className={`${stock > 0 ? "text-green-600 border-green-200 bg-green-50" : ""}`}>
                    {stock} Units
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const product = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => router.visit(route('producer.products.edit', product.id))}
                            className="text-amber-600 focus:text-amber-700 cursor-pointer"
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                             onClick={() => {
                                if (confirm('Are you sure you want to delete this product?')) {
                                    router.delete(route('producer.products.destroy', product.id), {
                                        onSuccess: () => {
                                            toast.success('Product deleted successfully!');
                                        },
                                        onError: () => {
                                            toast.error('Failed to delete product.');
                                        },
                                    });
                                }
                            }}
                            className="text-red-600 focus:text-red-700 cursor-pointer"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Product
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
