import { ProductOutOfStockException } from '@/core/Exceptions';
import type { ProductEntity } from './ProductEntity';

export class ProductModel {
    private product: ProductEntity;

    constructor(product: ProductEntity) {
        this.product = product;
    }

    increaseUnit(unit: number) {
        this.product.unit_stock += unit;
    }

    decreaseUnit(unit: number) {
        if (this.product.unit_stock < unit)
            throw new ProductOutOfStockException();
        this.product.unit_stock -= unit;
    }

    update(productUpdate: ProductEntity) {
        if (
            productUpdate.price != null ||
            productUpdate.unit_stock != null ||
            productUpdate.name != null
        ) {
            this.product.price = productUpdate.price;
            this.product.unit_stock = productUpdate.unit_stock;
            this.product.name = productUpdate.name;
        }
    }

    snapshot(): ProductEntity {
        return {
            id: this.product.id,
            producerId: this.product.producerId,
            price: this.product.price,
            unit_stock: this.product.unit_stock,
            unitOnCart: this.product.unitOnCart,
            name: this.product.name,
            category: this.product.category,
            fileName: this.product.fileName,
            description: this.product.description,
        };
    }
}
