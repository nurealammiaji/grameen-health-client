import React from 'react';
import ProductForm from '../ProductForm/ProductForm';
import HelmetAsync from './../HelmetAsync/HelmetAsync';

const AddProduct = () => {
    return (
        <div>
            <HelmetAsync title={"Add Product"} />
            <ProductForm />
        </div>
    );
};

export default AddProduct;