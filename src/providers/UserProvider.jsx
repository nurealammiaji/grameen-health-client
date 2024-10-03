import React, { useContext } from 'react';

export const UserContext = useContext();

const UserProvider = ({ children }) => {

    const userInfo = {};

    return (
        <UserContext.Provider value={userInfo}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;