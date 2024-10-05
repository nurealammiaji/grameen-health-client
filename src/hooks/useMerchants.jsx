import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate';

const useMerchants = () => {

    const axiosPrivate = useAxiosPrivate();

    const {
        data: merchants,
        refetch: refetchMerchants,
        isLoading: isMerchantsLoading,
        isError: isMerchantsError,
        error: merchantsError,
    } = useQuery({
        queryKey: ['users', 'read', 'merchants'],
        queryFn: async () => {
            const res = await axiosPrivate.get('/users/merchants/read');
            return res.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 15 * 60 * 1000, // 15 minutes
        onError: (error) => {
            console.error("Error fetching merchants:", error);
        },
    });

    return { isMerchantsLoading, merchants, refetchMerchants, isMerchantsError, merchantsError };
};

export default useMerchants;