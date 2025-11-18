import { motion } from 'framer-motion';
import { MdSearch } from 'react-icons/md';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { CardProduct } from './Card';

import type { ProductEntity } from '@/features/product/ProductEntity';
import { useProductContext } from '../context/useProductContext';

const buttonItem: { category: string }[] = [
    { category: 'All' },
    { category: 'fruit' },
    { category: 'legume' },
];

export const ProductCardList = () => {
    const bloc = useProductContext();
    const productList: ProductEntity[] | undefined = bloc?.productListFiltered;

    const observerRef = useIntersectionObserver(bloc.fetchMoreProducts, {
        threshold: 0.1,
        rootMargin: '100px',
    });

    return (
        <div
            className="bg-gray-50 py-12 transition-all duration-500 dark:bg-zinc-800"
            id="productList"
        >
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-extrabold text-green-800 transition-all duration-500 dark:text-amber-100">
                        Our Fresh Products
                    </h2>
                    <p className="mt-2 text-gray-600 transition-all duration-500 dark:text-gray-300">
                        Discover a variety of fresh and organic products from
                        local farmers.
                    </p>
                </div>
                <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="relative w-full md:w-1/3">
                        <input
                            onChange={(e) => bloc.setSearch(e.target.value)}
                            placeholder="Search for your favorite food..."
                            className="h-12 w-full rounded-full border-2 border-gray-200 pl-12 pr-4 text-lg transition-all duration-300 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
                    </div>
                    <div className="flex gap-3">
                        {buttonItem.map((item, key) => (
                            <button
                                onClick={() =>
                                    bloc.setFilterCategory(item.category)
                                }
                                key={key}
                                className={`rounded-full px-4 py-2 text-lg font-semibold transition-all duration-300 ${
                                    bloc.filterCategory === item.category
                                        ? 'bg-green-700 text-white shadow-md'
                                        : 'border-2 border-green-700 bg-white text-green-700 hover:bg-green-700 hover:text-white'
                                }`}
                            >
                                {item.category}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {productList.length === 0 ? (
                        <div className="col-span-full py-12 text-center">
                            <p className="text-2xl font-semibold text-gray-500 transition-all duration-500 dark:text-gray-300">
                                No products found.
                            </p>
                        </div>
                    ) : (
                        productList?.map((item, key) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: key * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <CardProduct product={item} key={key} />
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
            <div ref={observerRef} className="h-1 w-full" />
        </div>
    );
};
