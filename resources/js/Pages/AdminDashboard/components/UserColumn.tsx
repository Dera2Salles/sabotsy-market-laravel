'use client';

import { Button } from '@/components/ui/button';
import { type ColumnDef } from '@tanstack/react-table';


export const columns: ColumnDef<any>[] = [
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
                    Name
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="font-bold">{row.getValue('name')}</div>
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
                >
                    Email
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue('email')}</div>
        ),
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => {
            const role = row.getValue('role');
            let roleName = 'Customer';
            if (role === 1) roleName = 'Admin'; 
            if (role === 2) roleName = 'Producer';
            // Adjust mapping based on User model constants if known, or just display value
            return <div className="text-center">{roleName} ({role as number})</div>;
        },
    },
    {
        accessorKey: 'created_at',
        header: 'Joined',
        cell: ({ row }) => {
            return <div className="text-center">{new Date(row.getValue('created_at')).toLocaleDateString()}</div>;
        },
    },
    {
        accessorKey: 'id',
        header: () => {},
        enableHiding: false,
        cell: ({ row }) => {
             // Placeholder for actions
            return <Button variant="outline" size="sm">Edit</Button>;
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
