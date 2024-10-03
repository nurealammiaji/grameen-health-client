import React from 'react';
import { createContext } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const userInfo = {};

    return (
        <UserContext.Provider value={userInfo}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;