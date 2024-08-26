import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { json } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(null);
    const [user, setUser] = useState(null);

    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    const login = async (email, password) => {
        setLoading(true);
        return await axiosPublic.post('/auth/login', { email, password })
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userInfo');
        setUser(null);
        setAuthenticated(false);
    };

    useEffect(() => {
        if (accessToken && userId) {
            setAuthenticated(true);
            setUser(true);
            setLoading(false);
        }
    }, [accessToken, userId])

    useEffect(() => {
        if (authenticated) {
            setLoading(false);
            const auth = async () => {
                await axiosPublic.get(`/auth/user/${userId}`, { headers: { "Authorization": `Bearer ${accessToken}` } })
                    .then((res) => {
                        const currentUser = res.data;
                        // setLoading(true);
                        if (currentUser) {
                            setUser(currentUser);
                            localStorage.setItem("userInfo", JSON.stringify(currentUser));
                            // setLoading(false);
                        };
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            };
            auth();
        };
    }, [authenticated])

    const authInfo = {
        user,
        loading,
        login,
        logout,
        authenticated,
        setAuthenticated,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;