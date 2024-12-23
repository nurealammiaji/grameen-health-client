import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate';

const useShops = () => {
    const axiosPrivate = useAxiosPrivate();

    const {
        data: users,
        refetch: refetchUsers,
        isLoading: isUsersLoading,
        isError: isUsersError,
        error: usersError,
    } = useQuery({
        queryKey: ['users', 'read'],
        queryFn: async () => {
            const res = await axiosPrivate.get('/users/read');
            return res.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 15 * 60 * 1000, // 15 minutes
        onError: (error) => {
            console.error("Error fetching users:", error);
        },
    });

    return { isUsersLoading, users, refetchUsers, isUsersError, usersError };
};

export default useShops;
