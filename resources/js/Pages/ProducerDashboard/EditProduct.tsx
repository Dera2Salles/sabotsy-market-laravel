import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { ProducerHeader } from './components/ProducerHeader';
import { ProducerSidebar } from './components/ProducerSidebar';

interface Category {
    id: number;
    name: string;
}

interface EditProductProps {
    product: {
        id: number;
        product_name: string;
        product_description: string;
        unit_price: string | number;
        unit_stock: string | number;
        category_id: string | number;
        image: string;
    }
    categories: Category[];
}

export default function EditProduct({ product, categories }: EditProductProps) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        product_name: product.product_name,
        product_description: product.product_description,
        unit_price: product.unit_price,
        unit_stock: product.unit_stock,
        category_id: product.category_id,
        image: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('producer.products.update', product.id));
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Head title="Edit Product" />
            <ProducerSidebar />
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <ProducerHeader />
                <div className="flex flex-1 flex-col gap-8 p-6 md:p-8 bg-gray-50/50 dark:bg-zinc-900/50 min-h-screen">
                    <div className="mx-auto w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-800 p-8">
                         <div className="mb-8 flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    Edit Product
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">
                                    Update details for {product.product_name}.
                                </p>
                            </div>
                            {/* Current Image Preview */}
                            <div className="h-16 w-16 rounded-lg overflow-hidden border border-gray-200">
                                <img src={product.image} alt="Current" className="h-full w-full object-cover" />
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="product_name">Product Name</Label>
                                <Input
                                    id="product_name"
                                    value={data.product_name}
                                    onChange={(e) => setData('product_name', e.target.value)}
                                    className="bg-gray-50 dark:bg-zinc-800/50"
                                />
                                {errors.product_name && <p className="text-red-500 text-sm">{errors.product_name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="product_description">Description</Label>
                                <Textarea
                                    id="product_description"
                                    value={data.product_description}
                                    onChange={(e: any) => setData('product_description', e.target.value)}
                                    className="bg-gray-50 dark:bg-zinc-800/50 min-h-[120px]"
                                />
                                {errors.product_description && <p className="text-red-500 text-sm">{errors.product_description}</p>}
                            </div>

                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="unit_price">Price ($)</Label>
                                    <Input
                                        id="unit_price"
                                        type="number"
                                        step="0.01"
                                        value={data.unit_price}
                                        onChange={(e) => setData('unit_price', e.target.value)}
                                        className="bg-gray-50 dark:bg-zinc-800/50"
                                    />
                                    {errors.unit_price && <p className="text-red-500 text-sm">{errors.unit_price}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="unit_stock">Stock Quantity</Label>
                                    <Input
                                        id="unit_stock"
                                        type="number"
                                        value={data.unit_stock}
                                        onChange={(e) => setData('unit_stock', e.target.value)}
                                        className="bg-gray-50 dark:bg-zinc-800/50"
                                    />
                                     {errors.unit_stock && <p className="text-red-500 text-sm">{errors.unit_stock}</p>}
                                </div>
                            </div>

                             <div className="space-y-2">
                                <Label htmlFor="category_id">Category</Label>
                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-gray-50 dark:bg-zinc-800/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="" disabled>Select a category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">Update Image (Optional)</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                    className="bg-gray-50 dark:bg-zinc-800/50 cursor-pointer pt-1.5"
                                />
                                {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
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
                                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/20"
                                >
                                    Update Product
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
