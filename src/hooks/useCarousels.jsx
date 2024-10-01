import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useCarousels = () => {
    const axiosPublic = useAxiosPublic();

    const {
        data: carousels,
        refetch: refetchCarousels,
        isLoading: isCarouselsLoading,
        isError: isCarouselsError,
        error: carouselsError,
    } = useQuery({
        queryKey: ['carousels', 'read'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/carousels/read`);
            return res.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 15 * 60 * 1000, // 15 minutes
        // Optional: Uncomment to enable automatic refetching
        // refetchOnWindowFocus: true,
        // refetchOnReconnect: true,
        onError: (error) => {
            console.error("Error fetching carousels:", error);
        },
    });

    return {
        isCarouselsLoading,
        carousels,
        refetchCarousels,
        isCarouselsError,
        carouselsError
    };
};

export default useCarousels;