import React, { useState } from 'react';
import { createContext } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {

    const axiosPublic = useAxiosPublic();
    const axiosPrivate = useAxiosPrivate();

    const [selectedOrders, setSelectedOrders] = useState([]);

    const addOrder = async (formData) => {
        return await axiosPrivate.post('/orders/create', formData)
    }

    const deleteOrders = async () => {
        return await axiosPrivate.delete('/orders/delete', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                orderIds: selectedOrders,
            },
        })
    }

    const editOrder = async (_id, formData) => {
        console.log(_id, formData);
        return await axiosPrivate.put(`/orders/update/${_id}`, formData)
    }

    const orderInfo = {
        addOrder,
        editOrder,
        deleteOrders,
        selectedOrders,
        setSelectedOrders,
    };

    return (
        <OrderContext.Provider value={orderInfo}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderProvider;