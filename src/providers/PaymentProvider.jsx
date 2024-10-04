import React from 'react';
import { createContext } from 'react';

export const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {

    const paymentInfo = {};

    return (
        <PaymentContext.Provider value={paymentInfo}>
            {children}
        </PaymentContext.Provider>
    );
};

export default PaymentProvider;