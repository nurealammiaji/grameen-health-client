import React, { useContext } from 'react';
import useAxiosPublic from './useAxiosPublic';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {

    const axiosPublic = useAxiosPublic();
    const { authenticated } = useContext(AuthContext);
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    const { data: userData, refetch: refetchUser, isLoading: isUserLoading } = useQuery({
        queryKey: ['user', userId, accessToken],
        enabled: !!authenticated,
        queryFn: async () => {
            const res = await axiosPublic.get(`/auth/user/${userId}`, { headers: { 'Authorization': `Bearer ${accessToken}` } })
            return res.data;
        },
    })

    console.log(userData);
    return [isUserLoading, userData, refetchUser];

};

export default useUser;