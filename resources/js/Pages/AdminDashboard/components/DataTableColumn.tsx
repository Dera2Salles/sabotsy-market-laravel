'use client';
import defaut from '@/assets/defaut.jpg';

import { Button } from '@/components/ui/button';
import { type ColumnDef } from '@tanstack/react-table';

import type { ProductEntity } from '@/features/product/ProductEntity';
import { MenuAction } from './MenuAction';

export const columns: ColumnDef<ProductEntity>[] = [
    {
        accessorKey: 'image',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Image
                </Button>
            );
        },
        cell: ({ row }) => (
            <img
                src={
                    row.getValue('image') || defaut
                }
                alt={row.getValue('name')}
                className="size-16 rounded-md object-cover"
            />
        ),
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Nom
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="font-bold">{row.getValue('name')}</div>
        ),
    },
    {
        accessorKey: 'category',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Catégorie
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-center lowercase">
                {row.getValue('category')}
            </div>
        ),
    },
    {
        accessorKey: 'unit',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Unité
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-center lowercase">{row.getValue('unit')}</div>
        ),
    },
    {
        accessorKey: 'price',
        header: () => <div className="text-center">Prix</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('price'));

            return (
                <div className="text-center font-medium">{amount.toLocaleString()} MGA</div>
            );
        },
    },
    {
        accessorKey: 'id',
        header: () => {},
        enableHiding: false,
        cell: ({ row }) => {
            const productId: string = row.getValue('id') || 'null';
            return <MenuAction productId={productId} />;
        },
    },
];

// <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="h-8 w-8 p-0">
//             <span className="sr-only">Open menu</span>
//             <MoreHorizontal />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuLabel>Actions</DropdownMenuLabel>
//           <DropdownMenuItem
//           >
//             Copy payment ID
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem>View customer</DropdownMenuItem>
//           <DropdownMenuItem>View payment details</DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
