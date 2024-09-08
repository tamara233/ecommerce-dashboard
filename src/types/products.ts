export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    availability: string;
    product_category: {
        name: string;
    };
}