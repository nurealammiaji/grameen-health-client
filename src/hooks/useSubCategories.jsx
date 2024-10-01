import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useSubCategories = () => {
    const axiosPublic = useAxiosPublic();

    const {
        data: subCategories,
        refetch: refetchSubCategories,
        isLoading: isSubCategoriesLoading,
        isError: isSubCategoriesError,
        error: subCategoriesError,
    } = useQuery({
        queryKey: ['subCategories', 'read'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/subCategories/read`);
            return res.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 15 * 60 * 1000, // 15 minutes
        onError: (error) => {
            console.error("Error fetching sub categories:", error);
        },
    });

    return {
        isSubCategoriesLoading,
        subCategories,
        refetchSubCategories,
        isSubCategoriesError,
        subCategoriesError
    };
};

export default useSubCategories;