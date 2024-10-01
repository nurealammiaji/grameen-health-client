import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useCarousels = () => {

    const axiosPublic = useAxiosPublic();

    const { data: carousels, refetch: refetchCarousels, isLoading: isCarouselsLoading } = useQuery({
        queryKey: ['carousels'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/carousels/read`)
            return res.data;
        },
    })

    return [isCarouselsLoading, carousels, refetchCarousels];

};

export default useCarousels;