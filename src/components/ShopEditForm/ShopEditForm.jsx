import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RiAddBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';
import useMerchants from '../../hooks/useMerchants';
import { ShopContext } from '../../providers/ShopProvider';
import useShops from '../../hooks/useShops';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const ShopEditForm = () => {

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const { isMerchantsLoading, merchants, refetchMerchants, isMerchantsError, merchantsError } = useMerchants();
    const { isShopsLoading, shops, refetchShops, isShopsError, shopsError } = useShops();
    const { t } = useTranslation();
    const [fileWithPreview, setFileWithPreview] = useState(null);
    const [filesWithPreview, setFilesWithPreview] = useState([]);
    const [shopData, setShopData] = useState();
    const [merchantId, setMerchantId] = useState();
    const { editShop } = useContext(ShopContext);
    const editShopId = localStorage.getItem('editShopId');
    const axiosPublic = useAxiosPublic();
    const server = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if (editShopId) {
            const fetchShops = async () => {
                await axiosPublic.get(`/shops/read/${editShopId}`)
                    .then(({ data }) => {
                        console.log(data);
                        setShopData(data);
                        setMerchantId(data.merchant._id);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
            fetchShops();
        }
    }, [editShopId]);

    const handleEditShop = async (data) => {
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
            } else {
                Swal.fire({
                    target: document.getElementById('edit_shop_modal'),
                    position: "center",
                    icon: "warning",
                    title: "Need Shop Logo !!",
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }

            // Multiple Images
            if (filesWithPreview.length > 0) {
                filesWithPreview.forEach(item => {
                    formData.append('shopBanners[]', item.file);
                });
            } else {
                Swal.fire({
                    target: document.getElementById('edit_shop_modal'),
                    position: "center",
                    icon: "warning",
                    title: "Need Shop Banners !!",
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }

            console.log('Form Data before sending:', Array.from(formData.entries()));

            const response = await editShop(formData);
            console.log('Response from server:', response.data);

            Swal.fire({
                target: document.getElementById('edit_shop_modal'),
                position: "center",
                icon: "success",
                title: "Updated Successfully !!",
                showConfirmButton: false,
                timer: 1500
            });

            refetchShops();
            setFileWithPreview(null);
            setFilesWithPreview([]);
            reset();

        } catch (error) {
            console.error('Error from backend:', error.response ? error.response.data : error.message);
            Swal.fire({
                target: document.getElementById('edit_shop_modal'),
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
            <form onSubmit={handleSubmit(handleEditShop)} className="p-5 mx-auto border rounded-xl bg-base-200">
                <div className="grid gap-5 md:grid-cols-2">
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Shop Name<span className="font-bold text-error">*</span></span>
                        </label>
                        <input defaultValue={shopData?.name} {...register("name", { required: true })} type="text" placeholder="Type name here" className="w-full input input-bordered" />
                        {errors.name?.type === 'required' && <span className="text-error">{t('requiredName')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Shop Owner<span className="font-bold text-error">*</span></span>
                        </label>
                        <select defaultValue={merchantId} onChange={e => setMerchantId(e.target.value)} {...register("merchant", { required: true })} className="w-full select select-bordered">
                            <option value="">select merchant</option>
                            {
                                (merchants) &&
                                merchants.map((merchant, index) => (
                                    <option key={index} value={merchant._id}>{merchant.name}</option>
                                ))
                            }
                            <option value="test">test merchant</option>
                        </select>
                        {errors.category?.type === 'required' && <span className="text-error">{t('requiredMerchant')} !!</span>}
                    </div>
                </div>
                <div className="w-full mt-5 form-control">
                    <label className="label">
                        <span className="font-semibold label-text">Shop Address<span className="font-bold text-error">*</span></span>
                    </label>
                    <textarea defaultValue={shopData?.address} {...register("address", { required: true })} rows={3} className="w-full textarea textarea-bordered" placeholder="Type descriptions here"></textarea>
                    {errors.address?.type === 'required' && <span className="text-error">{t('requiredAddress')} !!</span>}
                </div>
                <div className="w-full mt-5 form-control">
                    <label className="label">
                        <span className="font-semibold label-text">Shop Description<span className="font-bold text-error">*</span></span>
                    </label>
                    <textarea defaultValue={shopData?.description} {...register("description", { required: true })} rows={5} className="w-full textarea textarea-bordered" placeholder="Type descriptions here"></textarea>
                    {errors.description?.type === 'required' && <span className="text-error">{t('requiredDescription')} !!</span>}
                </div>

                {/* Single File Upload Section */}
                <div className="w-full mt-5 form-control">
                    <label className="label">
                        <span className="font-semibold label-text">New Shop Logo<span className="font-bold text-error">*</span> {(fileWithPreview) ? <span className="font-normal text-success">(Selected: 1 Image)</span> : <span className="font-normal text-info">(Max: 1 Image)</span>}</span>
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
                ) || shopData && (
                    <div className="mt-5">
                        <label className="label my-2">
                            <span className="font-semibold label-text text-warning">Current Shop Logo</span>
                        </label>
                        <img src={server + shopData?.shopLogo} alt="Preview" className="w-full h-40 rounded" />
                    </div>
                )}

                {/* Multiple Files Upload Section */}
                <div className="w-full mt-5 form-control">
                    <label className="label">
                        <span className="font-semibold label-text">New Shop Banners<span className="font-bold text-error">*</span> {(filesWithPreview?.length > 0) ? <span className="font-normal text-success">(Selected: {(filesWithPreview?.length > 1) ? `${filesWithPreview?.length} Images` : `${filesWithPreview?.length} Image`})</span> : <span className="font-normal text-info">(Max: 5 Images)</span>}</span>
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
                {filesWithPreview.length > 0 && (
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
                ) || shopData && (
                    <div className="mt-5">
                        <label className="label my-2">
                            <span className="font-semibold label-text text-warning">Current Shop Banners</span>
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            {shopData?.shopBanners.map((item, index) => (
                                <div key={index}>
                                    <img src={server + item} alt={`Preview ${index}`} className="w-full h-40 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button type="submit" className="w-full mt-8 btn btn-success">{t('editShop')}</button>

            </form>
        </div>
    );
};

export default ShopEditForm;
