import React, { createContext } from 'react'

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {

    const productInfo = {
        product: {
            name: "test Product"
        }
    };

    return (
        <ProductContext.Provider value={productInfo}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;