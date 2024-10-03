import React from 'react';
import { createContext } from 'react';

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {

    const orderInfo = {};

    return (
        <OrderContext.Provider value={orderInfo}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderProvider;