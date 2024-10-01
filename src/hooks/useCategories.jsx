import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useCategories = () => {
    const axiosPublic = useAxiosPublic();

    const {
        data: categories,
        refetch: refetchCategories,
        isLoading: isCategoriesLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['categories', 'read'],
        queryFn: async () => {
            const res = await axiosPublic.get('/categories/read');
            return res.data;
        },
        // Optional: Customize your query behavior
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
    });

    return { isCategoriesLoading, categories, refetchCategories, isError, error };
};

export default useCategories;