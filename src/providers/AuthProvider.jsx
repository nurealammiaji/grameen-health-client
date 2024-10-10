import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    const axiosPublic = useAxiosPublic();
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(!!accessToken);
    const [user, setUser] = useState(null);

    const userRegister = async (formData) => {
        setLoading(true);
        return await axiosPublic.post('/auth/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    }

    const userLogin = async (phone, password) => {
        setLoading(true);
        return await axiosPublic.post('/auth/login', { phone, password })
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('editShopId');
        setUser(null);
        setAuthenticated(false);
    };

    useEffect(() => {
        if (accessToken && userId) {
            setAuthenticated(true);
            const auth = async () => {
                await axiosPrivate.get(`/users/read/${userId}`)
                    .then((res) => {
                        const currentUser = res.data;
                        if (currentUser) {
                            setUser(currentUser);
                            localStorage.setItem("userInfo", JSON.stringify(currentUser));
                        }
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.error(err);
                        setLoading(false);
                        logout();
                    });
            };
            auth();
        } else {
            setLoading(false);
        }
    }, [accessToken, userId]);

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        userLogin,
        userRegister,
        logout,
        authenticated,
        setAuthenticated,
        accessToken,
        userId,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
