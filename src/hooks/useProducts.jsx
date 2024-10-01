import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useProducts = () => {

    const axiosPublic = useAxiosPublic();

    const { data: products, refetch: refetchProducts, isLoading: isProductsLoading } = useQuery({
        queryKey: ['shops'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/read`)
            return res.data;
        },
    })

    return [isProductsLoading, products, refetchProducts];

};

export default useProducts;