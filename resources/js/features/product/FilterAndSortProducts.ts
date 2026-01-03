import type { FilterAndSortProductsParams } from "@/core/FilterAndSortProduct";
import { leveinshtein_distance } from "@/core/utils/leveinshtein";
import type { ProductEntity } from "./ProductEntity";

export const filter = ({
  products,
  category,
  searchTerm,
}: FilterAndSortProductsParams): ProductEntity[] => {
  const productListFiltered: ProductEntity[] = products
    .filter((item) => {
      const categoryMatch =
        !category ||
        category.toLowerCase() === "all" ||
        item.category?.name.toLowerCase() === category.toLowerCase();
      return categoryMatch;
    })
    .map((item) => {
      const diff = leveinshtein_distance(
        (item.product_name || "").toLowerCase(),
        (searchTerm || "").toLowerCase()
      );
      return { ...item, diff };
    })
    .filter((item) => {
      if (searchTerm === "") return true;
      const threshold = searchTerm.length / 2;
      return item.diff <= threshold;
    })
    .sort((item, anotherItem) => {
      const diffA = (item as any).diff || 0;
      const diffB = (anotherItem as any).diff || 0;
      if (diffA !== diffB) {
        return diffA - diffB;
      }
      return (item.product_name || "").localeCompare(anotherItem.product_name || "");
    });

  return productListFiltered;
};
