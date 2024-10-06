import React from 'react';
import { createContext } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {

    const axiosPrivate = useAxiosPrivate();
    const axiosPublic = useAxiosPublic();

    const addCategory = async (formData) => {
        return await axiosPrivate.post('/categories/create', formData)
    }

    const categoryInfo = {
        addCategory,
    };

    return (
        <CategoryContext.Provider value={categoryInfo}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;