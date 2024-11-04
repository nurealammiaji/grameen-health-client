import React, { useState } from 'react';
import { createContext } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {

    const axiosPrivate = useAxiosPrivate();
    const axiosPublic = useAxiosPublic();

    const [selectedCategories, setSelectedCategories] = useState([]);

    const addCategory = async (formData) => {
        return await axiosPrivate.post('/categories/create', formData)
    };

    const editCategory = async (_id, formData) => {
        console.log(_id, formData);
        return await axiosPrivate.put(`/categories/update/${_id}`, formData)
    };

    const deleteCategory = async () => {
        return await axiosPrivate.delete('/categories/delete', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                categoryIds: selectedCategories,
            },
        })
    };

    const categoryInfo = {
        addCategory,
        editCategory,
        deleteCategory,
        selectedCategories,
        setSelectedCategories,
    };

    return (
        <CategoryContext.Provider value={categoryInfo}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;