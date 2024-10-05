import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useShops = () => {
    const axiosPublic = useAxiosPublic();

    const {
        data: shops,
        refetch: refetchShops,
        isLoading: isShopsLoading,
        isError: isShopsError,
        error: shopsError,
    } = useQuery({
        queryKey: ['shops', 'read'],
        queryFn: async () => {
            const res = await axiosPublic.get('/shops/read');
            return res.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 15 * 60 * 1000, // 15 minutes
        onError: (error) => {
            console.error("Error fetching shops:", error);
        },
    });

    return { isShopsLoading, shops, refetchShops, isShopsError, shopsError };
};

export default useShops;
