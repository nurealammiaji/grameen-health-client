import React, { useState } from 'react';
import { createContext } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const SubCategoryContext = createContext();

const SubCategoryProvider = ({ children }) => {

    const axiosPrivate = useAxiosPrivate();
    const axiosPublic = useAxiosPublic();

    const [selectedSubCategories, setSelectedSubCategories] = useState([]);

    const addSubCategory = async (formData) => {
        return await axiosPrivate.post('/subCategories/create', formData)
    }

    const deleteSubCategory = async () => {
        return await axiosPrivate.delete('/subCategories/delete', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                subCategoryIds: selectedSubCategories,
            },
        })
    }

    const editSubCategory = async (_id, formData) => {
        console.log(_id, formData);
        return await axiosPrivate.put(`/subCategories/update/${_id}`, formData)
    }

    const subCategoryInfo = {
        addSubCategory,
        editSubCategory,
        deleteSubCategory,
        selectedSubCategories,
        setSelectedSubCategories,
    };

    return (
        <SubCategoryContext.Provider value={subCategoryInfo}>
            {children}
        </SubCategoryContext.Provider>
    );
};

export default SubCategoryProvider;