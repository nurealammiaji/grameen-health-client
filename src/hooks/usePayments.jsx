import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
import useAxiosPrivate from './useAxiosPrivate';

const usePayments = () => {

    const axiosPrivate = useAxiosPrivate();

    const {
        data: payments,
        refetch: refetchPayments,
        isLoading: isPaymentsLoading,
        isError: isPaymentsError,
        error: paymentsError,
    } = useQuery({
        queryKey: ['payments', 'read'],
        queryFn: async () => {
            const res = await axiosPrivate.get('/payments/read');
            return res.data; // Ensure this matches your expected data structure
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 15 * 60 * 1000, // 15 minutes
        onError: (error) => {
            console.error("Error fetching payments:", error);
        },
    });

    return { isPaymentsLoading, payments, refetchPayments, isPaymentsError, paymentsError };
};

export default usePayments;