import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { flexRender } from '@tanstack/react-table';
import { ChevronDown, PlusCircle, Search, Inbox } from 'lucide-react';
import { EditInput } from './EditInput';

import { useScrollLock } from '@/pages/landingPage/hooks/useScrollLock';
import { useDashboardContext } from '../context/useDashboardContext';
import { useDataTable } from '../hooks/useDataTable';

export const ProductDataTable = () => {
    const { observerRef, table, columns } = useDataTable();
    const { isEditModalVisible } = useDashboardContext();
    useScrollLock(isEditModalVisible);

    return (
        <div className="w-full rounded-lg bg-white p-4 shadow-lg transition-all duration-500 dark:bg-zinc-900 sm:p-6">
            <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-6 dark:border-zinc-700 md:flex-row md:items-center">
                <section>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Product List
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-zinc-400">
                        Easily manage your products here.
                    </p>
                </section>
                <Button className="flex cursor-pointer items-center gap-2 rounded-md bg-green-700 px-5 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                    <PlusCircle className="h-5 w-5" />
                    <span>Ajouter</span>
                </Button>
            </div>
            <div className="mt-6 flex items-center justify-between">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Filter products by name..."
                        value={
                            (table
                                .getColumn('name')
                                ?.getFilterValue() as string) ?? ''
                        }
                        onChange={(event) =>
                            table
                                .getColumn('name')
                                ?.setFilterValue(event.target.value)
                        }
                        className="w-full rounded-md pl-10"
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="ml-auto flex items-center gap-2 rounded-md"
                        >
                            Columns <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border dark:border-zinc-700">
                <ScrollArea className="relative h-[60vh]">
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur-sm dark:bg-zinc-900/95">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                    className="border-b border-gray-200/80 dark:border-zinc-700/80"
                                >
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    ))}
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
                                        className="border-b border-gray-200/80 transition-colors duration-200 ease-in-out hover:bg-gray-100/50 data-[state=selected]:bg-green-50 dark:border-zinc-700/80 dark:hover:bg-zinc-800/50 dark:data-[state=selected]:bg-green-900/20"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className="px-6 py-4 text-gray-800 dark:text-zinc-200"
                                            >
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
                                        className="h-48 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <Inbox className="h-12 w-12 text-gray-400" />
                                            <h3 className="text-lg font-semibold text-gray-700 dark:text-zinc-300">
                                                No Products Found
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-zinc-400">
                                                There are no products matching
                                                your current filter.
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="p-0"
                                >
                                    <span
                                        ref={observerRef}
                                        className="block h-1"
                                    ></span>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </ScrollArea>
                {isEditModalVisible && (
                    <Modal>
                        <EditInput />
                    </Modal>
                )}
            </div>
        </div>
    );
};
