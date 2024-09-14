import React from 'react';
import ProductForm from '../ProductForm/ProductForm';
import { useMutation } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const CreateOrUpdateProduct = ({ product }) => {

    const axiosPublic = useAxiosPublic();

    const createProduct = useMutation((formData) => {
        return axiosPublic.post('/products/create', formData);
    });

    const updateProduct = useMutation((formData) => {
        return axiosPublic.put(`/products/update/${product.id}`, formData);
    });

    const handleSubmit = (formData) => {
        if (product) {
            updateProduct.mutate(formData);
        } else {
            createProduct.mutate(formData);
        }
    };

    return (
        <div className="text-center mt-10">
            <h1>{product ? 'Update Product' : 'Create Product'}</h1>
            <ProductForm product={product} onSubmit={handleSubmit} />
        </div>
    );
};

export default CreateOrUpdateProduct;
