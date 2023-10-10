import { Product } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

export const fetchProducts = (): Promise<Array<Product>> => {
    return fetch(`https://fakestoreapi.com/products`).then((res) =>
        res.json(),
    );
};

export const fetchProductsLimit = (limit: number): Promise<Array<Product>> => {
    return fetch(`https://fakestoreapi.com/products?limit=${limit}`).then((res) =>
        res.json(),
    );
};

const useFetchProducts = () => {
    return useQuery(['products'], () => fetchProducts());
};

export default useFetchProducts;
