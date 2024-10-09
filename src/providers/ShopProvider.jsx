import React, { useState } from 'react';
import { createContext } from 'react';
import useAxiosPublic from './../hooks/useAxiosPublic';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {

    const axiosPublic = useAxiosPublic();
    const axiosPrivate = useAxiosPrivate()

    const [selectedShops, setSelectedShops] = useState([]);

    const addShop = async (formData) => {
        return await axiosPrivate.post('/shops/create', formData)
    }

    const deleteShops = async (shops) => {
        return await axiosPrivate.delete('/shops/delete', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                shopIds: selectedShops,
            },
        })
    }

    const shopInfo = {
        addShop,
        deleteShops,
        selectedShops,
        setSelectedShops,
    };

    return (
        <ShopContext.Provider value={shopInfo}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopProvider;