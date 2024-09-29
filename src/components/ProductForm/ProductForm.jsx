import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RiAddBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';

const ProductForm = () => {

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const { t } = useTranslation();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [variants, setVariants] = useState([]);

    const handleAddProduct = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        // Accessing all selected files
        const files = formData.getAll('photoURL');

        // Check if files were selected and limit to 5
        if (files.length > 5) {
            console.log("You can only upload up to 5 images.");
            return; // Stop if too many files
        }

        if (files.length === 0) {
            console.log("No files selected");
            return; // Stop if no files
        }

        // Prepare files for upload
        files.forEach(file => {
            console.log(file.name); // Log each file name
            formData.append('images[]', file);
        });

        // Collect other form data
        const productData = {
            name: formData.get('name'),
            category: formData.get('category'),
            manufacturer: formData.get('manufacturer'),
            supplier: formData.get('supplier'),
            details: formData.get('details'),
            variants: variants.filter(variant => variant.size || variant.color), // Filter out empty entries
        };

        console.log(productData); // Log or process your product data

        // Reset form fields after submission
        setSelectedFiles([]);
        setVariants([{ size: '', color: '' }]); // Reset variants
        event.target.reset();
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files); // Convert FileList to Array
        if (selectedFiles.length + files.length > 5) {
            console.log("You can only upload up to 5 images.");
            return; // Prevent adding more than 5 files
        }
        setSelectedFiles(prevFiles => [...prevFiles, ...files]); // Append new files
    };

    const handleVariantChange = (index, field, value) => {
        const newVariants = [...variants];
        newVariants[index][field] = value; // Update the specific variant field
        setVariants(newVariants);
    };

    const addVariant = () => {
        setVariants([...variants, { size: '', color: '' }]); // Add a new empty variant object
    };

    const removeVariant = (index) => {
        setVariants(variants.filter((_, i) => i !== index)); // Remove the selected variant
    };

    // Clean up object URLs on unmount
    useEffect(() => {
        return () => {
            selectedFiles.forEach(file => {
                URL.revokeObjectURL(URL.createObjectURL(file));
            });
        };
    }, [selectedFiles]);

    return (
        <div>
            <form onSubmit={handleAddProduct} className="p-10 mx-auto rounded-xl bg-base-200 border">
                <div className="grid gap-5 md:grid-cols-2">
                    {/* Input fields for product details */}
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input {...register("name", { required: true })} type="text" name="name" placeholder="Type name here" className="w-full input input-bordered" required />
                        {errors.name?.type === 'required' && <label className="label">
                            <span className="text-error">{t('requiredName')} !!</span>
                        </label>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Quantity</span>
                        </label>
                        <input type="number" min={1} name="quantity" placeholder="Type category here" className="w-full input input-bordered" required />
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select type="text" name="category" placeholder="Select Category" className="w-full select select-bordered" required>
                            <option value="">select category</option>
                        </select>
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Sub Category</span>
                        </label>
                        <select type="text" name="subCategory" placeholder="Select Sub Category" className="w-full select select-bordered" required>
                            <option value="">select sub category</option>
                        </select>
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number" min={0} name="price" placeholder="Type price here" className="w-full input input-bordered" required />
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Special Price</span>
                        </label>
                        <input type="number" min={0} name="specialPrice" placeholder="Type category here" className="w-full input input-bordered" required />
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Shop</span>
                        </label>
                        <select type="text" name="shop" placeholder="Select Shop" className="w-full select select-bordered" required>
                            <option value="">select shop</option>
                        </select>
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Need Advance ?</span>
                        </label>
                        <input type="number" min={0} name="needAdvance" placeholder="Type advance here" className="w-full input input-bordered" required />
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Brand Name</span>
                        </label>
                        <input type="text" name="brand" placeholder="Type brand here" className="w-full input input-bordered" required />
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Origin Country</span>
                        </label>
                        <input type="text" name="originCountry" placeholder="Type origin here" className="w-full input input-bordered" required />
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Manufacturer Name</span>
                        </label>
                        <input type="text" name="manufacturer" placeholder="Type manufacturer here" className="w-full input input-bordered" required />
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Importer Name</span>
                        </label>
                        <input type="text" name="importer" placeholder="Type importer here" className="w-full input input-bordered" required />
                    </div>
                </div>
                <div className="w-full mt-5 form-control">
                    <label className="label">
                        <span className="label-text">Product Description</span>
                    </label>
                    <textarea rows={5} name="details" placeholder="Type description here" className="w-full textarea textarea-bordered" required />
                </div>
                {/* Variants Input */}
                <div className="w-full mt-5 form-control">
                    <div className="flex items-center justify-between mb-2">
                        <label className="label">
                            <span className="label-text flex"><span className="hidden sm:block mr-2">Variants </span>(Size / Color)</span>
                        </label>
                        <button type="button" onClick={addVariant} className={`${variants.length > 0 ? "mt-2 btn btn-xs btn-info" : "hidden"}`}><RiAddBoxFill /> Add More</button>
                    </div>
                    {variants?.map((variant, index) => (
                        <div key={index} className="flex items-center my-2">
                            <input
                                type="text"
                                value={variant.size}
                                onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                                className="w-full input input-bordered mr-2"
                                placeholder={`Size for Variant ${index + 1}`}
                            />
                            <input
                                type="text"
                                value={variant.color}
                                onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                                className="w-full input input-bordered mr-2"
                                placeholder={`Color for Variant ${index + 1}`}
                            />
                            <button type="button" onClick={() => removeVariant(index)} className="ml-2 btn btn-error"><RiDeleteBin2Fill /> <span className="hidden sm:block">Remove</span></button>
                        </div>
                    ))}
                    <button type="button" onClick={addVariant} className={`${variants.length === 0 ? "mt-2 btn btn-outline btn-info btn-sm" : "hidden"}`}>Add Variant</button>
                </div>

                <div className="w-full mt-5 form-control">
                    <label className="label">
                        <span className="label-text">Image upload</span>
                    </label>
                    <input
                        type="file"
                        name="photoURL"
                        multiple
                        onChange={handleFileChange}
                        className="w-full file-input file-input-bordered"
                        accept="image/*"
                    />
                </div>
                {/* Display all selected images */}
                <div className="grid grid-cols-3 gap-4 mt-5">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="relative">
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index}`}
                                className="w-full h-[100px] rounded-lg"
                            />
                        </div>
                    ))}
                </div>
                <button type="submit" className="w-full mt-10 btn btn-success">Add Product</button>
            </form>
        </div>
    );
};

export default ProductForm;