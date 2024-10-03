import React from 'react';
import { createContext } from 'react';
import useAxiosPublic from './../hooks/useAxiosPublic';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {

    const axiosPublic = useAxiosPublic();
    const axiosPrivate = useAxiosPrivate()

    const addShop = async (formData) => {
        return await axiosPrivate.post('/shops/create', formData)
    }

    const shopInfo = {
        addShop,
    };

    return (
        <ShopContext.Provider value={shopInfo}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopProvider;