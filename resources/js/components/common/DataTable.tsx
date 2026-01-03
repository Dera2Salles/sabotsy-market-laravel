import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Inbox } from 'lucide-react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: {
        data: TData[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
    };
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data: data.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                        <Inbox className="h-8 w-8" />
                                        <p>No results found.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {data.links && data.links.length > 3 && (
                <Pagination>
                    <PaginationContent>
                        {data.links.map((link, i) => {
                            // Helper to parse label for Previous/Next
                            const label = link.label
                                .replace('&laquo;', '')
                                .replace('&raquo;', '')
                                .trim();
                            
                            if (!link.url) {
                                return (
                                    <PaginationItem key={i}>
                                        <span className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-transparent text-sm font-medium opacity-50">
                                            {label === 'Previous' ? (
                                                 <span className="sr-only">Previous</span> 
                                            ) : label === 'Next' ? (
                                                <span className="sr-only">Next</span>
                                            ) : (
                                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                            )}
                                            {label === 'Previous' && <span>&lt;</span>}
                                            {label === 'Next' && <span>&gt;</span>}
                                        </span>
                                    </PaginationItem>
                                );
                            }

                            if (label === 'Previous') {
                                return (
                                    <PaginationItem key={i}>
                                        <PaginationPrevious href={link.url} />
                                    </PaginationItem>
                                );
                            }

                            if (label === 'Next') {
                                return (
                                    <PaginationItem key={i}>
                                        <PaginationNext href={link.url} />
                                    </PaginationItem>
                                );
                            }

                            if (link.label === '...') {
                                return (
                                    <PaginationItem key={i}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );
                            }

                            return (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        href={link.url}
                                        isActive={link.active}
                                    >
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}
