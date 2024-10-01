import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useSubCategories = () => {

    const axiosPublic = useAxiosPublic();

    const { data: subCategories, refetch: refetchSubCategories, isLoading: isSubCategoriesLoading } = useQuery({
        queryKey: ['subCategories', 'read'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/subCategories/read`)
            return res.data;
        },
    })

    return [isSubCategoriesLoading, subCategories, refetchSubCategories];

};

export default useSubCategories;