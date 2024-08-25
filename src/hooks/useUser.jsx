import React, { useContext } from 'react';
import useAxiosPublic from './useAxiosPublic';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useUser = () => {

    const axiosPublic = useAxiosPublic();
    const { loading } = useContext(AuthContext);
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    const { isPending: isUserPending, isLoading: isUserLoading, isError: isUserError, data: userData, error: userError, refetch: refetchUser } = useQuery({
        queryKey: ['userId', 'accessToken'],
        // enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.post(`/auth/login/${userId}`, {headers: { 'Authorization': `Bearer ${accessToken}`}})
                return res.data
        },
    })

   return [isUserLoading, userData, refetchUser];

};

export default useUser;