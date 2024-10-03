import React from 'react';
import { createContext } from 'react';

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {

    const shopInfo = {};

    return (
        <ShopContext.Provider value={shopInfo}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopProvider;