import React from 'react';
import { useForm } from 'react-hook-form';

const ProductForm = ({ product, onSubmit }) => {
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: product || {
            name: '',
            description: '',
            price: '',
            category: '',
            variants: [],
            images: []
        }
    });

    // Handle image selection
    const handleImageChange = (e) => {
        setValue('images', e.target.files);
    };

    const handleFormSubmit = (data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'images') {
                Array.from(data.images).forEach((file) => {
                    formData.append('images', file);
                });
            } else {
                formData.append(key, data[key]);
            }
        });
        onSubmit(formData); // Send form data to parent component
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
                <label>Name</label>
                <input {...register('name')} />
            </div>
            <div>
                <label>Description</label>
                <textarea {...register('description')} />
            </div>
            <div>
                <label>Price</label>
                <input type="number" {...register('price')} />
            </div>
            <div>
                <label>Category</label>
                <input {...register('category')} />
            </div>
            <div>
                <label>Variants</label>
                <input {...register('variants')} placeholder="Color: Red, Size: L" />
            </div>
            <div>
                <label>Images</label>
                <input type="file" multiple onChange={handleImageChange} />
            </div>
            <button className="btn" type="submit">Submit</button>
        </form>
    );
};

export default ProductForm;
