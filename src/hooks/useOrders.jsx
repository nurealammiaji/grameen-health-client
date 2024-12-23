import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate';

const useOrders = () => {
    const axiosPrivate = useAxiosPrivate();

    const {
        data: orders,
        refetch: refetchOrders,
        isLoading: isOrdersLoading,
        isError: isOrdersError,
        error: ordersError,
    } = useQuery({
        queryKey: ['orders', 'read'],
        queryFn: async () => {
            const res = await axiosPrivate.get('/orders/read');
            return res.data; // Ensure this matches your expected data structure
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 15 * 60 * 1000, // 15 minutes
        onError: (error) => {
            console.error("Error fetching orders:", error);
        },
    });

    return { isOrdersLoading, orders, refetchOrders, isOrdersError, ordersError };
};

export default useOrders;