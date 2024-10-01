import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useCategories = () => {
    const axiosPublic = useAxiosPublic();

    const {
        data: categories,
        refetch: refetchCategories,
        isLoading: isCategoriesLoading,
        isError: isCategoriesError,
        error: categoriesError,
    } = useQuery({
        queryKey: ['categories', 'read'],
        queryFn: async () => {
            const res = await axiosPublic.get('/categories/read');
            return res.data; // Make sure to check if res.data is structured as expected
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 15 * 60 * 1000, // 15 minutes
        // Optional: Uncomment to enable automatic refetching
        // refetchOnWindowFocus: true,
        // refetchOnReconnect: true,
        onError: (error) => {
            console.error("Error fetching categories:", error);
        },
    });

    return {
        isCategoriesLoading,
        categories,
        refetchCategories,
        isCategoriesError,
        categoriesError
    };
};

export default useCategories;