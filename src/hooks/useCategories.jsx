import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useCategories = () => {

    const axiosPublic = useAxiosPublic();

    const { data: categories, refetch: refetchCategories, isLoading: isCategoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/categories/read`)
            return res.data;
        },
    })

    return [isCategoriesLoading, categories, refetchCategories];

};

export default useCategories;