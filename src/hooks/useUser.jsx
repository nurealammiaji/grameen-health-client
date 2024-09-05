import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate';

const useUser = () => {

    const axiosPrivate = useAxiosPrivate();
    const { authenticated } = useContext(AuthContext);
    const userId = localStorage.getItem('userId');

    const { data: userData, refetch: refetchUser, isLoading: isUserLoading } = useQuery({
        queryKey: ['user', userId, accessToken],
        enabled: !!authenticated,
        queryFn: async () => {
            const res = await axiosPrivate.get(`/users/${userId}`)
            return res.data;
        },
    })

    console.log(userData);
    return [isUserLoading, userData, refetchUser];

};

export default useUser;