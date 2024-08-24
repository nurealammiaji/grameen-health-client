import React, { useState } from 'react';
import { createContext } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        console.log(email, password);
        setLoading(true);
        await axiosPublic.post('/auth/login', { email, password })
            .then(({ data }) => {
                // Store JWT in local storage
                console.log(data.res);
                localStorage.setItem('accessToken', data.accessToken);
                // Update user info
                setUser(data.user);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    const authInfo = {
        user,
        loading,
        login,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;