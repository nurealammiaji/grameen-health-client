import React, { useContext } from 'react';

export const SubCategoryContext = useContext();

const SubCategoryProvider = ({ children }) => {

    const subCategoryInfo = {};

    return (
        <SubCategoryContext.Provider value={subCategoryInfo}>
            {children}
        </SubCategoryContext.Provider>
    );
};

export default SubCategoryProvider;