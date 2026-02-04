import { motion } from 'framer-motion';
import { MdSearch } from 'react-icons/md';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { CardProduct } from './Card';

import type { ProductEntity } from '@/features/product/ProductEntity';
import { useProductContext } from '../context/useProductContext';

export const ProductCardList = () => {
    const bloc = useProductContext();
    const productList: ProductEntity[] | undefined = bloc?.productListFiltered;
    const categories: { name: string }[] = bloc?.categories || [];

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
                <div className="mb-10 text-center md:mb-16">
                    <h2 className="text-3xl font-extrabold text-green-800 transition-all duration-500 dark:text-amber-100 md:text-5xl">
                        Nos Produits Frais
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 transition-all duration-500 dark:text-gray-300 md:text-lg">
                        Découvrez une variété de produits frais et biologiques provenant
                        d'agriculteurs locaux.
                    </p>
                </div>
                <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:gap-8">
                    {/* Premium Search Bar */}
                    <div className="relative w-full md:w-5/12">
                        <div className="group relative">
                            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 opacity-20 blur transition duration-300 group-focus-within:opacity-40" />
                            <div className="relative flex items-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 focus-within:ring-2 focus-within:ring-green-500 dark:bg-zinc-900/50 dark:ring-white/10">
                                <MdSearch className="ml-4 h-6 w-6 text-gray-400 group-focus-within:text-green-500" />
                                <input
                                    onChange={(e) => bloc.setSearch(e.target.value)}
                                    placeholder="Rechercher des produits frais..."
                                    className="h-12 w-full border-none bg-transparent px-4 text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-0 dark:text-white md:h-14 md:text-base"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Modern Category Chips */}
                    <div className="scrollbar-hide flex w-full items-center gap-2 overflow-x-auto pb-2 md:w-auto md:pb-0">
                        <div className="flex w-full gap-2 md:w-auto">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => bloc.setFilterCategory('All')}
                                className={`relative rounded-xl px-5 py-2.5 text-xs font-bold transition-all duration-300 whitespace-nowrap md:px-6 md:py-3 md:text-sm ${
                                    bloc.filterCategory === 'All'
                                        ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-zinc-900/50 dark:text-gray-400 dark:hover:bg-zinc-800'
                                }`}
                            >
                                Tous les Produits
                            </motion.button>
                            {categories.map((item, key) => (
                                <motion.button
                                    key={key}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => bloc.setFilterCategory(item.name)}
                                    className={`rounded-xl px-5 py-2.5 text-xs font-bold transition-all duration-300 whitespace-nowrap md:px-6 md:py-3 md:text-sm ${
                                        bloc.filterCategory === item.name
                                            ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                                            : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-zinc-900/50 dark:text-gray-400 dark:hover:bg-zinc-800'
                                    }`}
                                >
                                    {item.name}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {productList.length === 0 ? (
                        <div className="col-span-full py-12 text-center">
                            <p className="text-2xl font-semibold text-gray-500 transition-all duration-500 dark:text-gray-300">
                                Aucun produit trouvé.
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
