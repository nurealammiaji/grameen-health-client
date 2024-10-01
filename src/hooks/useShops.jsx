import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useShops = () => {

    const axiosPublic = useAxiosPublic();

    const { data: shops, refetch: refetchShops, isLoading: isShopsLoading } = useQuery({
        queryKey: ['shops'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/shops/read`)
            return res.data;
        },
    })

    return [isShopsLoading, shops, refetchShops];

};

export default useShops;