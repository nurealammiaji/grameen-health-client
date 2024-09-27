import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setAuthenticated, setLoading, loading, userLogin } = useContext(AuthContext);
    const [eyeClose, setEyeClose] = useState(true);
    const { t } = useTranslation();

    const location = useLocation();
    const navigate = useNavigate();
    const destination = location?.state?.from?.pathname || "/";

    const handleLogin = async (data) => {
        const { phone, password } = data;
        try {
            setLoading(true);
            await userLogin(phone, password)
                .then(({ data }) => {
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('userId', data.id);
                    setAuthenticated(true);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Logged In !!",
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
                });
        } catch (error) {
            console.log(error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 1500
            });
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="w-11/12 p-10 mx-auto my-auto border shadow-2xl rounded-3xl md:w-6/12">
                <div className="mx-auto md:w-10/12">
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="text-center">
                            <h3 className="text-3xl font-bold text-success">{t('login')}</h3>
                        </div>
                        <br />
                        {/* Email */}
                        {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" placeholder="email" name="email" className="input input-bordered" />
                                {errors.email?.type === 'required' && <span className="text-error">Email is required !!</span>}
                            </div> */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">{t('mobile')}</span>
                            </label>
                            <label className="flex items-center gap-2 input input-bordered">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 356.18" className="w-8"><g fillRule="nonzero"><path fill="#006A4E" d="M28.137 0H483.86C499.337 0 512 12.663 512 28.14v299.9c0 15.477-12.663 28.14-28.14 28.14H28.137C12.663 356.18 0 343.517 0 328.04V28.14C0 12.663 12.663 0 28.137 0z" /><path fill="#F42A41" d="M345.047 178.09c0-65.572-53.157-118.729-118.729-118.729-65.573 0-118.729 53.157-118.729 118.729s53.156 118.729 118.729 118.729c65.572 0 118.729-53.157 118.729-118.729z" /></g></svg>
                                <span>+88</span>
                                <input {...register("phone", {
                                    required: true, pattern: /^0\d{10}$/
                                })}
                                    type="string"
                                    placeholder="01726581454"
                                    name="phone"
                                    className="w-full grow"
                                />
                            </label>
                            {errors.phone?.type === 'required' && <label className="label">
                                <span className="text-error">{t('requiredMobile')} !!</span>
                            </label>}
                            {errors.phone?.type === 'pattern' && <span className="text-error">{t('invalidMobile')} !!</span>}
                        </div>
                        <div className="mt-1 form-control">
                            <label className="label">
                                <span className="label-text">{t('password')}</span>
                            </label>
                            <label className="flex items-center gap-2 input input-bordered">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-8 h-6 opacity-70">
                                    <path
                                        fillRule="evenodd"
                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                        clipRule="evenodd" />
                                </svg>
                                <div className="relative flex items-center w-full">
                                    <input {...register("password", { required: true, minLength: 6, pattern: /.{6}$/ })}
                                        type={(eyeClose) ? 'password' : 'text'}
                                        placeholder={t('typePassword')}
                                        name="password"
                                        className="w-full grow"
                                    />
                                    <p onClick={() => setEyeClose(!eyeClose)} className="absolute right-0 btn btn-xs">
                                        {
                                            (eyeClose) ?
                                                <RiEyeCloseLine className="text-2xl" /> : <RiEyeLine className="text-2xl" />
                                        }
                                    </p>
                                </div>
                            </label>
                            {errors.password?.type === 'required' && <span className="text-error">{t('requiredPassword')} !!</span>}
                            {errors.password?.type === 'minLength' && <span className="text-error">{t('invalidPassword')} !!</span>}
                            {errors.password?.type === 'pattern' && <span className="text-error">Any type of 6 character needed !!</span>}
                        </div>
                        <div className="mt-6 form-control">
                            <button className="text-white btn btn-success" type="submit">{(loading ? <><span className="text-white loading loading-spinner"></span><span className="ml-2">{t('processing')} ...</span></> : `${t('login')}`)}</button>
                        </div>
                    </form>
                    <div className="flex items-center justify-center mt-3">
                        <label className="label">
                            <span className="mr-2 text-sm">{t('newHere')} ?</span>
                            <Link to="/register" className="text-sm font-medium text-primary label-text-alt link link-hover">
                                {t('createAccount')}
                            </Link>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;