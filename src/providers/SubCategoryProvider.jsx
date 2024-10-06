import React from 'react';
import { createContext } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const SubCategoryContext = createContext();

const SubCategoryProvider = ({ children }) => {

    const axiosPrivate = useAxiosPrivate();
    const axiosPublic = useAxiosPublic();

    const addSubCategory = async (formData) => {
        return await axiosPrivate.post('/subCategories/create', formData)
    }

    const subCategoryInfo = {
        addSubCategory,
    };

    return (
        <SubCategoryContext.Provider value={subCategoryInfo}>
            {children}
        </SubCategoryContext.Provider>
    );
};

export default SubCategoryProvider;