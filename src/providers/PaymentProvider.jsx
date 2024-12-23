import React, { useState } from 'react';
import { createContext } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {

    const axiosPublic = useAxiosPublic();
    const axiosPrivate = useAxiosPrivate();

    const [selectedPayments, setSelectedPayments] = useState([]);

    const addPayment = async (formData) => {
        return await axiosPrivate.post('/payments/create', formData)
    }

    const deletePayments = async () => {
        return await axiosPrivate.delete('/payments/delete', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                paymentIds: selectedPayments,
            },
        })
    }

    const editPayment = async (_id, formData) => {
        console.log(_id, formData);
        return await axiosPrivate.put(`/payments/update/${_id}`, formData)
    }

    const paymentInfo = {
        addPayment,
        editPayment,
        deletePayments,
        selectedPayments,
        setSelectedPayments,
    };

    return (
        <PaymentContext.Provider value={paymentInfo}>
            {children}
        </PaymentContext.Provider>
    );
};

export default PaymentProvider;