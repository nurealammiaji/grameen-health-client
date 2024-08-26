import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('accessToken')); // Initialize based on token presence
    const [user, setUser] = useState(null);

    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    const login = async (email, password) => {
        setLoading(true);
        return await axiosPublic.post('/auth/login', { email, password })
            .then(({ data }) => {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('userId', data.id);
                setAuthenticated(true); // Set authenticated to true on successful login
                setUser(data.user); // Optionally set user data if available in the response
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
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
            const auth = async () => {
                await axiosPublic.get(`/auth/user/${userId}`, { headers: { "Authorization": `Bearer ${accessToken}` } })
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
                        logout(); // Optionally log out if fetching user data fails
                    });
            };
            auth();
        } else {
            setLoading(false);
        }
    }, [accessToken, userId]);

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
