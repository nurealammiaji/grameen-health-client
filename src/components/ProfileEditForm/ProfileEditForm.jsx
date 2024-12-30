import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useTranslation } from "react-i18next";

const ProfileEditForm = ({ profileData }) => {

    const { _id, name, status, email, phone, gender, password, dob, image, address, role, createdAt, updatedAt } = profileData;

    const { userRegister, setUser, setAuthenticated, loading, setLoading } = useContext(AuthContext);

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const [eyeCloseOne, setEyeCloseOne] = useState(true);
    const [eyeCloseTwo, setEyeCloseTwo] = useState(true);

    const [photo, setPhoto] = useState(null);
    const { t } = useTranslation();

    const pwd = watch("password");
    const rePwd = watch("confirmPassword");

    const server = import.meta.env.VITE_BACKEND_URL;

    const handleEditProfile = async (data) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('dob', data.dob);
            formData.append('phone', data.phone);
            formData.append('password', data.password);

            if (image) {
                formData.append('image', image);
            }

            console.log(data);
            console.log(formData);

            await userRegister(formData)
                .then(({ data }) => {
                    console.log(data);
                    console.log({ currentUser });
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Updated Successfully !",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(destination, { replace: true });
                })
                .catch((error) => {
                    if (error.response) {
                        // Server responded with a status other than 200 range
                        console.error('Server responded with:', error.response.status);
                    } else if (error.request) {
                        // Request was made but no response received
                        console.error('No response received:', error.request);
                    } else {
                        // Something happened in setting up the request
                        console.error('Error setting up request:', error.message);
                    }
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `${error.message}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setLoading(false);
                })

        } catch (error) {
            console.error('Error registering user:', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const handleImageChange = (e) => {
        setPhoto(e.target.files[0]);
        console.log(e);
    };

    return (
        <form onSubmit={handleSubmit(handleEditProfile)} className="p-5 mx-auto border rounded-xl bg-base-200">
            <figure className="mx-auto w-24 h-24 overflow-hidden rounded-full bottom-5 sm:bottom-0 left-5 sm:left-10 sm:w-32 sm:h-32 ring-4">
                <img src={server + image} className="w-full h-full" alt={`Image of ${name}`} />
            </figure>
            {/* Image Upload */}
            <div className="mt-5 form-control">
                <label className="label">
                    <span className="label-text">Image</span>
                </label>
                <input
                    type="file"
                    onChange={handleImageChange}
                    name="image"
                    className="file-input file-input-bordered"
                />
            </div>
            <div className="form-control mt-3">
                <label className="label">
                    <span className="label-text">{t('name')}</span>
                </label>
                <label className="flex items-center gap-2 input input-bordered">
                    {/* <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-8 h-6 opacity-70">
                                    <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                </svg> */}
                    <input {...register("name", { required: true })}
                        defaultValue={name}
                        type="text"
                        placeholder={t('typeName')}
                        name="name"
                        className="w-full grow"
                    />
                </label>
                {errors.name?.type === 'required' && <label className="label">
                    <span className="text-error">{t('requiredName')} !!</span>
                </label>}
            </div>
            <div className="mt-3 form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input {...register("email", { required: true })}
                    defaultValue={email}
                    type="email"
                    placeholder="email"
                    name="email"
                    className="input input-bordered"
                />
                {errors.email?.type === 'required' && <label className="label">
                    <span className="text-error">Email is required !!</span>
                </label>}
            </div>
            <div className="mt-3 form-control">
                <label className="label">
                    <span className="label-text">{t('mobile')}</span>
                </label>
                <label className="flex items-center gap-2 input input-bordered">
                    {/* <svg xmlns="http://www.w3.org/2000/svg"
                                    shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 356.18" className="w-8"><g fillRule="nonzero"><path fill="#006A4E" d="M28.137 0H483.86C499.337 0 512 12.663 512 28.14v299.9c0 15.477-12.663 28.14-28.14 28.14H28.137C12.663 356.18 0 343.517 0 328.04V28.14C0 12.663 12.663 0 28.137 0z" /><path fill="#F42A41" d="M345.047 178.09c0-65.572-53.157-118.729-118.729-118.729-65.573 0-118.729 53.157-118.729 118.729s53.156 118.729 118.729 118.729c65.572 0 118.729-53.157 118.729-118.729z" /></g></svg> */}
                    <span>+88</span>
                    <input {...register("phone", { required: true, pattern: /^0\d{10}$/ })}
                        defaultValue={phone}
                        type="text"
                        placeholder="01726581454"
                        name="phone"
                        className="w-full grow"
                    />
                </label>
                {errors.phone?.type === 'required' && <label className="label">
                    <span className="text-error">{t('requiredMobile')} !!</span>
                </label>}
                {errors.phone?.type === 'pattern' && <span className="mt-1 text-error">{t('invalidMobile')} !!</span>}
            </div>
            {/* Gender */}
            <div className="mt-3 form-control">
                <label className="label">
                    <span className="label-text">Gender</span>
                </label>
                <select {...register("gender", { required: true })}
                    type="text"
                    placeholder="gender"
                    name="gender"
                    className="select select-bordered"
                >
                    <option className="text-slate-500" value="">select gender</option>
                    <option className="font-medium" value="male">Male</option>
                    <option className="font-medium" value="female">Female</option>
                    <option className="font-medium" value="third">Third</option>
                </select>
                {errors.gender?.type === 'required' && <label className="label">
                    <span className="text-error">Gender is required !!</span>
                </label>}
            </div>
            {/* Date of Birth */}
            <div className="mt-3 form-control">
                <label className="label">
                    <span className="label-text">Date of Birth</span>
                </label>
                <input {...register("dob", { required: true })}
                    type="date"
                    placeholder="date of birth"
                    name="dob"
                    // pattern="\d{4}-\d{2}-\d{2}"
                    className="input input-bordered"
                />
                {errors.dob?.type === 'required' && <label className="label">
                    <span className="text-error">Date of Birth is required !!</span>
                </label>}
            </div>
            {/* Shipping Address */}
            <div className="mt-3 form-control">
                <label className="label">
                    <span className="label-text">Shipping Address</span>
                </label>
                <textarea {...register("address", { required: true })}
                    type="text"
                    placeholder="address"
                    name="address"
                    className="textarea textarea-bordered"
                />
                {errors.address?.type === 'required' && <label className="label">
                    <span className="text-error">Address is required !!</span>
                </label>}
            </div>
            <div className="mt-3 form-control">
                <label className="label">
                    <span className="label-text">{t('password')}</span>
                </label>
                <label className="flex items-center gap-2 input input-bordered">
                    {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-8 h-6 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg> */}
                    <div className="relative flex items-center w-full">
                        <input {...register("password", { required: true, minLength: 6, pattern: /.{6}$/ })}
                            type={(eyeCloseOne) ? 'password' : 'text'}
                            placeholder={t('typePassword')}
                            name="password"
                            className="w-full grow"
                        />
                        <p onClick={() => setEyeCloseOne(!eyeCloseOne)} className="absolute right-0 btn btn-xs">
                            {
                                (eyeCloseOne) ?
                                    <RiEyeCloseLine className="text-2xl" /> : < RiEyeLine className="text-2xl" />
                            }
                        </p>
                    </div>
                </label>
                {errors.password?.type === 'required' && <span className="text-error">{t('requiredPassword')} !!</span>}
                {errors.password?.type === 'minLength' && <span className="text-error">{t('invalidPassword')} !!</span>}
                {errors.password?.type === 'pattern' && <span className="text-error">Any type of character is required !!</span>}
            </div>
            {/* Confirm Password */}
            <div className="mt-3 form-control">
                <label className="label">
                    <span className="label-text">Confirm Password</span>
                </label>
                <div className="relative flex items-center">
                    <input {...register("confirmPassword", { required: true })}
                        type={(eyeCloseTwo) ? 'password' : 'text'}
                        placeholder="confirm password"
                        name="confirmPassword"
                        className="w-full input input-bordered"
                    />
                    <p onClick={() => setEyeCloseTwo(!eyeCloseTwo)} className="absolute right-2 btn btn-xs">
                        {
                            (eyeCloseTwo) ?
                                <RiEyeCloseLine className="text-2xl" /> : < RiEyeLine className="text-2xl" />
                        }
                    </p>
                </div>
                {errors.confirmPassword?.type === 'required' && <span className="text-error">Confirm Password is required !!</span>}
                {pwd === rePwd || <span className="text-error">Password is not matched !!</span>}
            </div>
            <div className="mt-10 form-control">
                <button className="text-white btn btn-success" type="submit">{(loading ? <><span className="text-white loading loading-spinner"></span><span className="ml-2">{t('processing')} ...</span></> : `${t('editProfile')}`)}</button>
            </div>
        </form>
    );
};

export default ProfileEditForm;