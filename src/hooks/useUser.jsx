import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate';

const useUser = () => {
    const axiosPrivate = useAxiosPrivate();
    const { authenticated, userId } = useContext(AuthContext);

    const {
        data: userData,
        refetch: refetchUser,
        isLoading: isUserLoading,
        isError: isUserError,
        error: userError,
    } = useQuery({
        queryKey: ['users', 'read', userId],
        enabled: !!authenticated && !!userId,
        queryFn: async () => {
            const res = await axiosPrivate.get(`/users/read/${userId}`);
            return res.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 15 * 60 * 1000, // 15 minutes
        onError: (error) => {
            console.error("Error fetching user data:", error);
        },
    });

    return {
        isUserLoading,
        isUserError,
        userData,
        refetchUser,
        userError
    };
};

export default useUser;