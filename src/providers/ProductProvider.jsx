import React, { createContext } from 'react'
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {

    const axiosPublic = useAxiosPublic();
    const axiosPrivate = useAxiosPrivate();

    const addProduct = async (formData) => {
        return await axiosPrivate.post('/products/create', formData)
    }

    const productInfo = {
        addProduct,
    };

    return (
        <ProductContext.Provider value={productInfo}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;