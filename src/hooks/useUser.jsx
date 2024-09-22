import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate';

const useUser = () => {

    const axiosPrivate = useAxiosPrivate();
    const { authenticated, userId } = useContext(AuthContext);

    const { data: userData, refetch: refetchUser, isLoading: isUserLoading } = useQuery({
        queryKey: ['users', userId],
        enabled: !!authenticated && !!userId,
        queryFn: async () => {
            const res = await axiosPrivate.get(`/users/read/${userId}`)
            return res.data;
        },
    })

    return [isUserLoading, userData, refetchUser];

};

export default useUser;