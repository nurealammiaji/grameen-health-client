import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ProductForm = () => {
    const { t } = useTranslation();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [variants, setVariants] = useState(['']); // Initialize with one empty variant

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
            variants: variants.filter(variant => variant), // Filter out empty entries
        };

        console.log(productData); // Log or process your product data

        // Reset form fields after submission
        setSelectedFiles([]);
        setVariants(['']); // Reset variants
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

    const handleVariantChange = (index, value) => {
        const newVariants = [...variants];
        newVariants[index] = value; // Update the specific variant
        setVariants(newVariants);
    };

    const addVariant = () => {
        setVariants([...variants, '']); // Add a new empty variant input
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
            <form onSubmit={handleAddProduct} className="w-9/12 p-10 mx-auto rounded-xl bg-base-200">
                <div className="grid gap-5 md:grid-cols-2">
                    {/* Input fields for product details */}
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Type name here" className="w-full input input-bordered" required />
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <input type="text" name="category" placeholder="Type category here" className="w-full input input-bordered" required />
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Manufacturer</span>
                        </label>
                        <input type="text" name="manufacturer" placeholder="Type manufacturer here" className="w-full input input-bordered" required />
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Supplier</span>
                        </label>
                        <input type="text" name="supplier" placeholder="Type supplier here" className="w-full input input-bordered" required />
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Details</span>
                        </label>
                        <input type="text" name="details" placeholder="Type details here" className="w-full input input-bordered" required />
                    </div>
                </div>

                {/* Variants Input */}
                <div className="w-full mt-5 form-control">
                    <label className="label">
                        <span className="label-text">Variants</span>
                    </label>
                    {variants.map((variant, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={variant}
                                onChange={(e) => handleVariantChange(index, e.target.value)}
                                className="w-full input input-bordered"
                                placeholder={`Variant ${index + 1}`}
                            />
                            <button type="button" onClick={() => removeVariant(index)} className="ml-2 btn btn-secondary">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addVariant} className="mt-2 btn btn-outline">Add Variant</button>
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

                <button type="submit" className="w-full mt-10 btn btn-primary">Add Product</button>
            </form>
        </div>
    );
};

export default ProductForm;
