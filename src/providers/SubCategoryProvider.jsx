import React from 'react';
import { createContext } from 'react';

export const SubCategoryContext = createContext();

const SubCategoryProvider = ({ children }) => {

    const subCategoryInfo = {};

    return (
        <SubCategoryContext.Provider value={subCategoryInfo}>
            {children}
        </SubCategoryContext.Provider>
    );
};

export default SubCategoryProvider;