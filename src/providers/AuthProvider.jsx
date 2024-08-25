import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(null);
    const [user, setUser] = useState(null);

    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    const login = async (email, password) => {
        console.log(email, password);
        setLoading(true);
        return await axiosPublic.post('/auth/login', { email, password })
        // .then(({ data }) => {
        //     // Store JWT in local storage
        //     console.log(data);
        //     localStorage.setItem('accessToken', data.accessToken);
        //     localStorage.setItem('userId', data.id);
        //     setLoading(false);
        // })
        // .catch((err) => {
        //     console.error(err);
        //     setLoading(false);
        // });
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        setUser(null);
        setAuthenticated(false);
    };

    useEffect(() => {
        if (authenticated) {
            console.log("hitted useEffect");
            const auth = async () => {
                await axiosPublic.get(`/auth/user/${userId}`, { headers: { "Authorization": `Bearer ${accessToken}` } })
                    .then((res) => {
                        console.log("hitted res");
                        console.log(res.data);
                        setUser(res.data);
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.log("hitted err");
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