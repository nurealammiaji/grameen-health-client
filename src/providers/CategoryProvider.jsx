import React, { createContext } from 'react';

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {

    const categoryInfo = {};

    return (
        <CategoryContext.Provider value={categoryInfo}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;