import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useProducts = () => {
    const axiosPublic = useAxiosPublic();

    const {
        data: products,
        refetch: refetchProducts,
        isLoading: isProductsLoading,
        isError: isProductsError,
        error: productsError,
    } = useQuery({
        queryKey: ['products', 'read'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products/read');
            return res.data; // Ensure this matches your expected data structure
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 15 * 60 * 1000, // 15 minutes
        onError: (error) => {
            console.error("Error fetching products:", error);
        },
    });

    console.log({products});

    return { isProductsLoading, products, refetchProducts, isProductsError, productsError };
};

export default useProducts;