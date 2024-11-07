import React, { useState, createContext } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {

    const axiosPublic = useAxiosPublic();
    const axiosPrivate = useAxiosPrivate();

    const [selectedProducts, setSelectedProducts] = useState([]);

    const addProduct = async (formData) => {
        return await axiosPrivate.post('/products/create', formData)
    }

    const deleteProducts = async () => {
        return await axiosPrivate.delete('/products/delete', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                productIds: selectedProducts,
            },
        })
    }

    const editProduct = async (_id, formData) => {
        console.log(_id, formData);
        return await axiosPrivate.put(`/products/update/${_id}`, formData)
    }

    const productInfo = {
        addProduct,
        editProduct,
        deleteProducts,
        selectedProducts,
        setSelectedProducts,
    };

    return (
        <ProductContext.Provider value={productInfo}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;