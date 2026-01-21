import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Textarea } from '@/components/ui/textarea';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { ProducerHeader } from './components/ProducerHeader';
import { ProducerSidebar } from './components/ProducerSidebar';

interface Category {
    id: number;
    name: string;
}

interface CreateProductProps {
    categories: Category[];
}

export default function CreateProduct({ categories }: CreateProductProps) {
    const { data, setData, post, processing, errors } = useForm({
        product_name: '',
        product_description: '',
        unit_price: '',
        unit_stock: '',
        category_id: '',
        image: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('producer.products.store'));
    };

    return (
        <SidebarProvider>
            <Head title="Create Product" />
            <ProducerSidebar variant="inset" />
            <SidebarInset className="overflow-y-auto">
                <ProducerHeader />
                <div className="flex min-h-screen flex-1 flex-col gap-8 bg-gray-50/50 p-6 dark:bg-zinc-900/50 md:p-8">
                    <div className="mx-auto w-full max-w-2xl rounded-xl border border-gray-100 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="mb-8">
                            <h1 className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-2xl font-bold text-transparent">
                                Add New Product
                            </h1>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                Fill in the details to list your product on the
                                marketplace.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="product_name">
                                    Product Name
                                </Label>
                                <Input
                                    id="product_name"
                                    value={data.product_name}
                                    onChange={(e) =>
                                        setData('product_name', e.target.value)
                                    }
                                    className="bg-gray-50 dark:bg-zinc-800/50"
                                    placeholder="e.g. Organic Strawberries"
                                />
                                {errors.product_name && (
                                    <p className="text-sm text-red-500">
                                        {errors.product_name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="product_description">
                                    Description
                                </Label>
                                <Textarea
                                    id="product_description"
                                    value={data.product_description}
                                    onChange={(e) =>
                                        setData(
                                            'product_description',
                                            e.target.value,
                                        )
                                    }
                                    className="min-h-[120px] bg-gray-50 dark:bg-zinc-800/50"
                                    placeholder="Describe your product..."
                                />
                                {errors.product_description && (
                                    <p className="text-sm text-red-500">
                                        {errors.product_description}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="unit_price">
                                        Price ($)
                                    </Label>
                                    <Input
                                        id="unit_price"
                                        type="number"
                                        step="0.01"
                                        value={data.unit_price}
                                        onChange={(e) =>
                                            setData(
                                                'unit_price',
                                                e.target.value,
                                            )
                                        }
                                        className="bg-gray-50 dark:bg-zinc-800/50"
                                        placeholder="0.00"
                                    />
                                    {errors.unit_price && (
                                        <p className="text-sm text-red-500">
                                            {errors.unit_price}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="unit_stock">
                                        Stock Quantity
                                    </Label>
                                    <Input
                                        id="unit_stock"
                                        type="number"
                                        value={data.unit_stock}
                                        onChange={(e) =>
                                            setData(
                                                'unit_stock',
                                                e.target.value,
                                            )
                                        }
                                        className="bg-gray-50 dark:bg-zinc-800/50"
                                        placeholder="Available stock"
                                    />
                                    {errors.unit_stock && (
                                        <p className="text-sm text-red-500">
                                            {errors.unit_stock}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category_id">Category</Label>
                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData('category_id', e.target.value)
                                    }
                                    className="flex h-10 w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800/50"
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <p className="text-sm text-red-500">
                                        {errors.category_id}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">Product Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    onChange={(e) =>
                                        setData(
                                            'image',
                                            e.target.files
                                                ? e.target.files[0]
                                                : null,
                                        )
                                    }
                                    className="cursor-pointer bg-gray-50 pt-1.5 dark:bg-zinc-800/50"
                                />
                                {errors.image && (
                                    <p className="text-sm text-red-500">
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg shadow-green-500/20 hover:from-green-700 hover:to-teal-700"
                                >
                                    Create Product
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
