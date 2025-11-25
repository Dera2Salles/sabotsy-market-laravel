import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { ImageUploader } from './ImageUploader';

export const CardWithForm = () => {
    const [image, setImage] = useState('');
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;

        const isValid =
            file &&
            file?.[0].type.startsWith('image/') &&
            file &&
            file.length > 0;

        if (isValid) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file?.[0]);
            setData('image', file[0]);
        }
    };

    const { data, setData, post, errors, processing } = useForm<{
        name: string;
        description: string;
        price: number;
        category: string;
        unit_stock: number;
        image: File | null;
    }>({
        name: '',
        description: '',
        price: 0,
        category: '',
        unit_stock: 0,
        image: null,
    });

    const sendToServer = () => {
        post('/product');
    };

    return (
        <div className="flex flex-col gap-5">
            <Card>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="gap- flex flex-col space-y-1.5">
                                <Label
                                    htmlFor="name"
                                    className="text-lg font-semibold text-green-700"
                                >
                                    Name
                                </Label>
                                <input
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    placeholder="Ex : Banana"
                                    className="border-1 h-12 rounded-sm bg-gray-100 pl-4 pr-11 text-lg transition-all duration-300 placeholder:text-lg focus:outline-none focus:ring-0"
                                />
                                <Label
                                    htmlFor="price"
                                    className="text-lg font-semibold text-green-700"
                                >
                                    Price
                                </Label>
                                <input
                                    type="number"
                                    onChange={(e) =>
                                        setData(
                                            'price',
                                            parseInt(e.target.value),
                                        )
                                    }
                                    placeholder="Ex : 1000"
                                    className="border-1 h-12 rounded-sm bg-gray-100 pl-4 pr-11 text-lg transition-all duration-300 placeholder:text-lg focus:outline-none focus:ring-0"
                                />
                                <Label
                                    htmlFor="name"
                                    className="text-lg font-semibold text-green-700"
                                >
                                    Unit
                                </Label>
                                <input
                                    type="number"
                                    onChange={(e) =>
                                        setData(
                                            'unit_stock',
                                            parseInt(e.target.value),
                                        )
                                    }
                                    placeholder="Ex : 52"
                                    className="border-1 h-12 rounded-sm bg-gray-100 pl-4 pr-11 text-lg transition-all duration-300 placeholder:text-lg focus:outline-none focus:ring-0"
                                />
                                <Label
                                    htmlFor="name"
                                    className="text-lg font-semibold text-green-700"
                                >
                                    Description
                                </Label>
                                <input
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    className="border-1 h-12 rounded-sm bg-gray-100 pl-4 pr-11 text-lg transition-all duration-300 placeholder:text-lg focus:outline-none focus:ring-0"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label
                                    htmlFor="name"
                                    className="text-lg font-semibold text-green-700"
                                >
                                    Category
                                </Label>
                                <Select
                                    onValueChange={(value) =>
                                        setData('category', value)
                                    }
                                >
                                    <SelectTrigger
                                        className="flex w-full"
                                        id="foodCategory"
                                    >
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="Épicerie">
                                            Épicerie
                                        </SelectItem>
                                        <SelectItem value="Fruits">
                                            Fruits
                                        </SelectItem>
                                        <SelectItem value="Boulangerie">
                                            Boulangerie
                                        </SelectItem>
                                        <SelectItem value="Légumes">
                                            Légumes
                                        </SelectItem>
                                        <SelectItem value="Produit Laitiers">
                                            Produit Laitiers
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end"></CardFooter>
            </Card>
            <Card>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="gap- flex flex-col space-y-1.5">
                                <ImageUploader
                                    image={image as string}
                                    onCallBack={handleImageChange}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="flex w-full justify-end">
                <Button
                    className="flex w-1/5 bg-green-700 hover:bg-green-900"
                    onClick={sendToServer}
                >
                    <div className="flex items-center justify-center gap-1 px-4 py-2">
                        <MdAdd className="text-3xl" />{' '}
                        <p className="text-xl">Add</p>
                    </div>
                </Button>
            </div>
        </div>
    );
};
