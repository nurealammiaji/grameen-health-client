import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RiAddBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';
import useMerchants from '../../hooks/useMerchants';
import { ShopContext } from './../../providers/ShopProvider';

const ShopForm = () => {

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const { isMerchantsLoading, merchants, refetchMerchants, isMerchantsError, merchantsError } = useMerchants();
    const { t } = useTranslation();
    const [fileWithPreview, setFileWithPreview] = useState(null);
    const [filesWithPreview, setFilesWithPreview] = useState([]);
    const { addShop } = useContext(ShopContext);

    const handleAddShop = async (data) => {
        try {
            const formData = new FormData();
            formData.append('type', 'shop');
            formData.append('name', data.name);
            formData.append('merchant', data.merchant);
            formData.append('address', data.address);
            formData.append('description', data.description);

            // Single Image
            if (fileWithPreview) {
                formData.append('shopLogo', fileWithPreview.file);
            }

            // Multiple Images
            if (filesWithPreview) {
                filesWithPreview.forEach(item => {
                    formData.append('shopBanners[]', item.file);
                });
            }

            console.log('Form Data before sending:', Array.from(formData.entries()));

            const response = await addShop(formData);
            console.log('Response from server:', response.data);

            Swal.fire({
                target: document.getElementById('add_shop_modal'),
                position: "center",
                icon: "success",
                title: "Added Successfully !!",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error('Error from backend:', error.response ? error.response.data : error.message);
            Swal.fire({
                target: document.getElementById('add_shop_modal'),
                position: "center",
                icon: "error",
                title: `Axios: ${error.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    // Handle file change
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the first file
        if (file) {
            const newFileWithPreview = {
                file,
                preview: URL.createObjectURL(file), // Create a blob URL for preview
            };
            setFileWithPreview(newFileWithPreview); // Update state with the new file
            event.target.value = ''; // Clear the input for the same file upload
        }
    };

    // Remove image
    const removeImage = () => {
        if (fileWithPreview) {
            URL.revokeObjectURL(fileWithPreview.preview); // Cleanup URL
            setFileWithPreview(null); // Clear the file state
        }
    };

    // Handle files changes
    const handleFilesChange = (event) => {
        const files = Array.from(event.target.files);
        const newFilesWithPreview = files.map(file => ({
            file,
            preview: URL.createObjectURL(file), // Create a blob URL for preview
        }));
        setFilesWithPreview(prev => [...prev, ...newFilesWithPreview]);
        event.target.value = ''; // Clear the input for the same file upload
    };

    // Remove images
    const removeImages = (index) => {
        setFilesWithPreview(prev => {
            const updatedFiles = [...prev];
            URL.revokeObjectURL(updatedFiles[index].preview); // Cleanup URL
            updatedFiles.splice(index, 1); // Remove image
            return updatedFiles; // Return updated files
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handleAddShop)} className="p-5 mx-auto border rounded-xl bg-base-200">
                <div className="grid gap-5 md:grid-cols-2">
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Shop Name</span>
                        </label>
                        <input {...register("name", { required: true })} type="text" placeholder="Type name here" className="w-full input input-bordered" />
                        {errors.name?.type === 'required' && <span className="text-error">{t('requiredName')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Shop Owner</span>
                        </label>
                        <select {...register("merchant", { required: true })} className="w-full select select-bordered">
                            <option value="">select merchant</option>
                            {
                                (merchants) &&
                                merchants.map((merchant, index) => (
                                    <option key={index} value={merchant._id}>{merchant.name}</option>
                                ))
                            }
                        </select>
                        {errors.category?.type === 'required' && <span className="text-error">{t('requiredMerchant')} !!</span>}
                    </div>
                </div>
                <div className="w-full mt-5 form-control">
                    <label className="label">
                        <span className="font-semibold label-text">Shop Address</span>
                    </label>
                    <textarea {...register("address", { required: true })} rows={3} className="w-full textarea textarea-bordered" placeholder="Type descriptions here"></textarea>
                    {errors.address?.type === 'required' && <span className="text-error">{t('requiredAddress')} !!</span>}
                </div>
                <div className="w-full mt-5 form-control">
                    <label className="label">
                        <span className="font-semibold label-text">Shop Description</span>
                    </label>
                    <textarea {...register("description", { required: true })} rows={5} className="w-full textarea textarea-bordered" placeholder="Type descriptions here"></textarea>
                    {errors.description?.type === 'required' && <span className="text-error">{t('requiredDescription')} !!</span>}
                </div>

                {/* Single File Upload Section */}
                <div className="w-full mt-5 form-control">
                    <label className="label">
                        <span className="font-semibold label-text">Shop Logo {(fileWithPreview) ? <span className="font-normal text-success">(Selected: 1 Image)</span> : <span className="font-normal text-error">(Max: 1 Image)</span>}</span>
                    </label>
                    <input
                        type="file"
                        id="fileUpload"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={`${fileWithPreview ? "hidden" : "file-input w-full file-input-bordered"}`}
                    />
                </div>

                {/* Image Preview */}
                {fileWithPreview && (
                    <div className="mt-5">
                        <div className="relative">
                            <img src={fileWithPreview?.preview} alt="Preview" className="w-full h-40 rounded" />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-0 right-0 p-1 text-red-500 bg-white rounded-full hover:bg-gray-200"
                            >
                                <RiDeleteBin2Fill />
                            </button>
                        </div>
                    </div>
                )}

                {/* Multiple Files Upload Section */}
                <div className="w-full mt-5 form-control">
                    <label className="label">
                        <span className="font-semibold label-text">Shop Banners {(filesWithPreview?.length > 0) ? <span className="font-normal text-success">(Selected: {(filesWithPreview?.length > 1) ? `${filesWithPreview?.length} Images` : `${filesWithPreview?.length} Image`})</span> : <span className="font-normal text-error">(Max: 5 Images)</span>}</span>
                    </label>
                    <input
                        type="file"
                        id="fileUpload"
                        multiple
                        accept="image/*"
                        {...register('shopBanners')}
                        onChange={handleFilesChange}
                        className={`${filesWithPreview?.length === 5 ? "hidden" : "file-input w-full file-input-bordered"}`}
                    />
                </div>

                {/* Images Previews */}
                {filesWithPreview && (
                    <div className="grid grid-cols-3 gap-4 mt-5">
                        {filesWithPreview.map((item, index) => (
                            <div key={index} className="relative">
                                <img src={item.preview} alt={`Preview ${index}`} className="w-full h-40 rounded" />
                                <button
                                    type="button"
                                    onClick={() => removeImages(index)}
                                    className="absolute top-0 right-0 p-1 text-red-500 bg-white rounded-full hover:bg-gray-200"
                                >
                                    <RiDeleteBin2Fill />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Submit Button */}
                <button type="submit" className="w-full mt-8 btn btn-success">{t('addShop')}</button>

            </form>
        </div>
    );
};

export default ShopForm;
