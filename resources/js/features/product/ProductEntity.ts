export interface ProductEntity {
    id?: string;
    producerId?: string;
    price: number;
    unit_stock: number;
    name: string;
    category: string;
    fileName?: string;
    description: string;
}
