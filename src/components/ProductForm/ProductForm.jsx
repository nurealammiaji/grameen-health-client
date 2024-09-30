import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RiAddBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';
import { ProductContext } from '../../providers/ProductProvider';
import Swal from 'sweetalert2';

const ProductForm = () => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const { t } = useTranslation();
    const [filesWithPreview, setFilesWithPreview] = useState([]);
    const [variants, setVariants] = useState([]);
    const { addProduct } = useContext(ProductContext);

    const variantOptions = ['size', 'color', 'pieces'];

    // Handle form submission
    // const handleAddProduct = async (data) => {
    //     try {
            
    //         console.log({ data });
    //         const formData = new FormData();

    //         formData.append('type', 'product');
    //         formData.append('name', data.name);
    //         formData.append('quantity', data.quantity);
    //         formData.append('category', data.category);
    //         formData.append('subCategory', data.subCategory);
    //         formData.append('price', data.price);
    //         formData.append('specialPrice', data.specialPrice);
    //         formData.append('shop', data.shop);
    //         formData.append('needAdvance', data.needAdvance);
    //         formData.append('brand', data.brand);
    //         formData.append('originCountry', data.originCountry);
    //         formData.append('manufacturer', data.manufacturer);
    //         formData.append('model', data.model);
    //         formData.append('details', data.details);

    //         // Append only filled variants to formData
    //         variants.forEach((variant) => {
    //             const variantData = {};
    //             if (variant.type === 'size' && variant.value) variantData.size = variant.value;
    //             if (variant.type === 'color' && variant.value) variantData.color = variant.value;
    //             if (variant.type === 'pieces' && variant.value) variantData.pieces = variant.value;

    //             // Only add to formData if variantData has properties
    //             if (Object.keys(variantData).length > 0) {
    //                 formData.append('variants[]', JSON.stringify(variantData));
    //             }
    //         });

    //         filesWithPreview.forEach(item => {
    //             formData.append('images[]', item.file);
    //         });

    //         // Reset the form and state
    //         console.log('Form Data:', formData);

    //         await addProduct(formData)
    //             .then(({ data }) => {
    //                 console.log(data);
    //                 Swal.fire({
    //                     target: document.getElementById('add_product_modal'),
    //                     position: "center",
    //                     icon: "success",
    //                     title: "Added Successfully !!",
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    //                 // reset();
    //                 // setFilesWithPreview([]);
    //                 // setVariants([]);
    //                 console.log('Response from server:', response.data);
    //             })
    //             .catch((error) => {
    //                 console.error('Error from backend:', error.response ? error.response.data : error.message);
    //                 Swal.fire({
    //                     target: document.getElementById('add_product_modal'),
    //                     position: "center",
    //                     icon: "error",
    //                     title: `Axios: ${error.message}`,
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    //                 console.log('Response from server:', response.data);
    //             });
    //     } catch (error) {
    //         console.error('Error from backend:', error.response ? error.response.data : error.message);

    //         Swal.fire({
    //             target: document.getElementById('add_product_modal'),
    //             position: "center",
    //             icon: "error",
    //             title: `CatchError: ${error.message}`,
    //             showConfirmButton: false,
    //             timer: 1500
    //         });
    //     }
    // };
    const handleAddProduct = async (data) => {
        try {
            const formData = new FormData();
            formData.append('type', 'product');
            formData.append('name', data.name);
            formData.append('quantity', data.quantity);
            formData.append('category', data.category);
            formData.append('subCategory', data.subCategory);
            formData.append('price', data.price);
            formData.append('specialPrice', data.specialPrice);
            formData.append('shop', data.shop);
            formData.append('needAdvance', data.needAdvance);
            formData.append('brand', data.brand);
            formData.append('originCountry', data.originCountry);
            formData.append('manufacturer', data.manufacturer);
            formData.append('model', data.model);
            formData.append('details', data.details);
    
            variants.forEach((variant) => {
                const variantData = {};
                if (variant.type === 'size' && variant.value) variantData.size = variant.value;
                if (variant.type === 'color' && variant.value) variantData.color = variant.value;
                if (variant.type === 'pieces' && variant.value) variantData.pieces = variant.value;
    
                if (Object.keys(variantData).length > 0) {
                    formData.append('variants[]', JSON.stringify(variantData)); // Check this format with your backend
                }
            });
    
            filesWithPreview.forEach(item => {
                formData.append('images[]', item.file);
            });
    
            console.log('Form Data before sending:', Array.from(formData.entries()));
    
            const response = await addProduct(formData);
            console.log('Response from server:', response.data);
            // handle success...
        } catch (error) {
            console.error('Error from backend:', error.response ? error.response.data : error.message);
        }
    };
    

    // Handle file changes
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newFilesWithPreview = files.map(file => ({
            file,
            preview: URL.createObjectURL(file), // Create a blob URL for preview
        }));
        setFilesWithPreview(prev => [...prev, ...newFilesWithPreview]);
        event.target.value = ''; // Clear the input for the same file upload
    };

    // Remove an image
    const removeImage = (index) => {
        setFilesWithPreview(prev => {
            const updatedFiles = [...prev];
            URL.revokeObjectURL(updatedFiles[index].preview); // Cleanup URL
            updatedFiles.splice(index, 1); // Remove image
            return updatedFiles; // Return updated files
        });
    };

    const handleVariantChange = (index, field, value) => {
        const newVariants = [...variants];
        newVariants[index][field] = value;
        setVariants(newVariants);
    };

    const addVariant = () => {
        setVariants([...variants, { type: 'size', value: '' }]);
    };

    const removeVariant = (index) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handleAddProduct)} className="p-5 mx-auto border rounded-xl bg-base-200">
                <div className="grid gap-5 md:grid-cols-2">
                    {/* Register inputs with react-hook-form */}
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input {...register("name", { required: true })} type="text" placeholder="Type name here" className="w-full input input-bordered" />
                        {errors.name?.type === 'required' && <span className="text-error">{t('requiredName')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Quantity</span>
                        </label>
                        <input {...register("quantity", { required: true, min: 1 })} type="number" min={1} placeholder="Type quantity here" className="w-full input input-bordered" />
                        {errors.quantity?.type === 'required' && <span className="text-error">{t('requiredQuantity')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select {...register("category", { required: true })} className="w-full select select-bordered">
                            <option value="">select category</option>
                            <option value="test">test category</option>
                        </select>
                        {errors.category?.type === 'required' && <span className="text-error">{t('requiredCategory')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Sub Category</span>
                        </label>
                        <select {...register("subCategory", { required: true })} className="w-full select select-bordered">
                            <option value="">select sub category</option>
                            <option value="testSub">test sub category</option>
                        </select>
                        {errors.subCategory?.type === 'required' && <span className="text-error">{t('requiredSubCategory')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input {...register("price", { required: true, min: 0 })} type="number" min={0} placeholder="Type price here" className="w-full input input-bordered" />
                        {errors.price?.type === 'required' && <span className="text-error">{t('requiredPrice')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Special Price</span>
                        </label>
                        <input {...register("specialPrice", { required: true, min: 0 })} type="number" min={0} placeholder="Type special price here" className="w-full input input-bordered" />
                        {errors.specialPrice?.type === 'required' && <span className="text-error">{t('requiredSpecialPrice')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Shop</span>
                        </label>
                        <select {...register("shop", { required: true })} className="w-full select select-bordered">
                            <option value="">Select shop</option>
                            <option value="testShop">test shop</option>
                        </select>
                        {errors.shop?.type === 'required' && <span className="text-error">{t('requiredShop')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Need Advance?</span>
                        </label>
                        <input {...register("needAdvance", { required: true, min: 0 })} type="number" placeholder="Type advance here" className="w-full input input-bordered" />
                        {errors.needAdvance?.type === 'required' && <span className="text-error">{t('requiredAdvance')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Brand Name</span>
                        </label>
                        <input {...register("brand", { required: true })} type="text" placeholder="Type brand here" className="w-full input input-bordered" />
                        {errors.brand?.type === 'required' && <span className="text-error">{t('requiredBrand')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Model</span>
                        </label>
                        <input {...register("model", { required: true })} type="text" placeholder="Type model here" className="w-full input input-bordered" />
                        {errors.model?.type === 'required' && <span className="text-error">{t('requiredModel')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Origin Country</span>
                        </label>
                        <input {...register("originCountry", { required: true })} type="text" placeholder="Type origin country here" className="w-full input input-bordered" />
                        {errors.originCountry?.type === 'required' && <span className="text-error">{t('requiredOriginCountry')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Manufacturer</span>
                        </label>
                        <input {...register("manufacturer", { required: true })} type="text" placeholder="Type manufacturer here" className="w-full input input-bordered" />
                        {errors.manufacturer?.type === 'required' && <span className="text-error">{t('requiredManufacturer')} !!</span>}
                    </div>

                </div>

                <div className="w-full mt-5 form-control">
                    <label className="label">
                        <span className="label-text">Details</span>
                    </label>
                    <textarea {...register("details", { required: true })} rows={5} className="w-full textarea textarea-bordered" placeholder="Type details here"></textarea>
                    {errors.details?.type === 'required' && <span className="text-error">{t('requiredDescription')} !!</span>}
                </div>

                {/* Variants Input */}
                <div className="w-full mt-5 form-control">
                    <div className="flex items-center justify-between mb-2">
                        <label className="label">
                            <span className="flex label-text">
                                <span className="hidden mr-2 sm:block">Variants (Choose Type)</span>
                            </span>
                        </label>
                        <button type="button" onClick={addVariant} className={`${variants.length > 0 ? "btn btn-xs btn-info" : "hidden"}`}>
                            <RiAddBoxFill /> Add More
                        </button>
                    </div>
                    {variants.map((variant, index) => (
                        <div key={index} className="flex items-center w-full my-2">
                            <select
                                value={variant.type}
                                onChange={(e) => handleVariantChange(index, 'type', e.target.value)}
                                className="w-1/3 mr-2 select select-bordered"
                            >
                                {variantOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                value={variant.value}
                                onChange={(e) => handleVariantChange(index, 'value', e.target.value)}
                                className="w-2/3 mr-2 input input-bordered"
                                placeholder={`Enter ${variant.type}`}
                            />
                            <button type="button" onClick={() => removeVariant(index)} className="btn btn-error">
                                <RiDeleteBin2Fill className="text-lg" />
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addVariant} className={`${variants?.length === 0 ? "btn btn-sm btn-info" : "hidden"}`}>
                        <RiAddBoxFill /> Add Variant
                    </button>
                </div>

                {/* File Upload Section */}
                <div className="w-full mt-5 form-control">
                    {/* <label htmlFor="fileUpload">Upload Images</label> */}
                    <label className="label">
                        <span className="label-text">Upload Images</span>
                    </label>
                    <input
                        type="file"
                        id="fileUpload"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className={`${filesWithPreview?.length === 5 ? "hidden" : "file-input w-full file-input-bordered"}`}
                    />
                </div>

                {/* Image Previews */}
                <div className="grid grid-cols-3 gap-4 mt-5">
                    {filesWithPreview.map((item, index) => (
                        <div key={index} className="relative">
                            <img src={item.preview} alt={`Preview ${index}`} className="w-full h-40 rounded" />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-0 right-0 p-1 text-red-500 bg-white rounded-full hover:bg-gray-200"
                            >
                                <RiDeleteBin2Fill />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full mt-8 btn btn-success">{t('addProduct')}</button>

            </form>
        </div>
    );
};

export default ProductForm;
