import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { CarouselContext } from '../../providers/CarouselProvider';

const CarouselAddForm = () => {

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const { t } = useTranslation();
    const [fileWithPreview, setFileWithPreview] = useState(null);
    const {addCarousel} = useContext(CarouselContext);

    const handleAddCarousel = async (data) => {
        try {
            const formData = new FormData();
            formData.append('type', 'carousel');
            formData.append('name', data.name);
            formData.append('status', data.status);
            formData.append('destination', data.destination);
            formData.append('description', data.description);

            // Single Image
            if (fileWithPreview) {
                formData.append('image', fileWithPreview.file);
            }

            console.log('Form Data before sending:', Array.from(formData.entries()));

            const response = await addCarousel(formData);
            console.log('Response from server:', response.data);

            Swal.fire({
                target: document.getElementById('add_carousel_modal'),
                position: "center",
                icon: "success",
                title: "Added Successfully !!",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error('Error from backend:', error.response ? error.response.data : error.message);
            Swal.fire({
                target: document.getElementById('add_carousel_modal'),
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

    return (
        <div>
            <form onSubmit={handleSubmit(handleAddCarousel)} className="p-5 mx-auto border rounded-xl bg-base-200">
                <div className="grid gap-5 md:grid-cols-2">
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Carousel Name</span>
                        </label>
                        <input {...register("name", { required: true })} type="text" placeholder="Type name here" className="w-full input input-bordered" />
                        {errors.name?.type === 'required' && <span className="text-error">{t('requiredName')} !!</span>}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Carousel Status</span>
                        </label>
                        <select {...register("status", { required: true })} className="w-full select select-bordered">
                            <option className="text-slate-500" value="">select status</option>
                            <option className="font-medium text-success" value="active">Active</option>
                            <option className="font-medium text-error" value="inactive">Inactive</option>
                            <option className="font-medium text-warning" value="pending">Pending</option>
                        </select>
                        {errors.status?.type === 'required' && <span className="text-error">{t('requiredStatus')} !!</span>}
                    </div>
                </div>
                <div className="w-full mt-5 form-control">
                        <label className="label">
                            <span className="font-semibold label-text">Destination URL</span>
                        </label>
                        <input {...register("destination", { required: true })} type="text" placeholder="Type destination here" className="w-full input input-bordered" />
                        {errors.name?.type === 'required' && <span className="text-error">{t('requiredName')} !!</span>}
                    </div>
                <div className="w-full mt-5 form-control">
                    <label className="label">
                        <span className="font-semibold label-text">Carousel Description</span>
                    </label>
                    <textarea {...register("description", { required: true })} rows={5} className="w-full textarea textarea-bordered" placeholder="Type descriptions here"></textarea>
                    {errors.description?.type === 'required' && <span className="text-error">{t('requiredDescription')} !!</span>}
                </div>

                {/* Single File Upload Section */}
                <div className="w-full mt-5 form-control">
                    <label className="label">
                        <span className="font-semibold label-text">Carousel Image {(fileWithPreview) ? <span className="font-normal text-success">(Selected: 1 Image)</span> : <span className="font-normal text-info">(Max: 1 Image)</span>}</span>
                    </label>
                    <input
                        type="file"
                        id="fileUpload"
                        accept="image/*"
                        {...register("image")}
                        onChange={handleFileChange}
                        className={`${fileWithPreview ? "hidden" : "file-input w-full file-input-bordered"}`}
                    />
                </div>

                {/* Image Preview */}
                {fileWithPreview && (
                    <div className="mt-5">
                        <div className="relative">
                            <img src={fileWithPreview?.preview} alt="Preview" className="w-full h-48 rounded" />
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

                {/* Submit Button */}
                <button type="submit" className="w-full mt-8 btn btn-success">{t('addCarousel')}</button>

            </form>
        </div>
    );
};

export default CarouselAddForm;
