import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import HelmetAsync from './../../components/HelmetAsync/HelmetAsync';
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UtilityContext } from '../../providers/UtilityProvider';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { setAuthenticated, setLoading, loading, userLogin, user } = useContext(AuthContext);
    const { test } = useContext(UtilityContext);
    const [eyeClose, setEyeClose] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const destination = location?.state?.from?.pathname || "/";

    useEffect(() => {
        if (user && location?.pathname === "/login") {
            Swal.fire({
                position: "center",
                icon: "info",
                title: "Already Logged In !!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate(destination, { replace: true });
        }
    }, [location, navigate, user]);

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
                        title: "Logged In Successfully !",
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
            <br /><br /><br /><br />
            <HelmetAsync title={"Login"} />
            <div>
                <div className="w-11/12 p-10 mx-auto my-auto border shadow-2xl rounded-3xl md:w-6/12">
                    <div className="mx-auto md:w-10/12">
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <div className="text-center">
                                <h3 className="text-3xl font-bold text-success">Login</h3>
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
                                    <span className="label-text">Mobile</span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 356.18" className="w-8"><g fillRule="nonzero"><path fill="#006A4E" d="M28.137 0H483.86C499.337 0 512 12.663 512 28.14v299.9c0 15.477-12.663 28.14-28.14 28.14H28.137C12.663 356.18 0 343.517 0 328.04V28.14C0 12.663 12.663 0 28.137 0z" /><path fill="#F42A41" d="M345.047 178.09c0-65.572-53.157-118.729-118.729-118.729-65.573 0-118.729 53.157-118.729 118.729s53.156 118.729 118.729 118.729c65.572 0 118.729-53.157 118.729-118.729z" /></g></svg>
                                    <span>+88</span>
                                    <input {...register("phone", {
                                        required: true, pattern: /^0\d{10}$/
                                    })}
                                        type="string"
                                        placeholder="01726581454"
                                        name="phone"
                                        className="grow w-full"
                                    />
                                </label>
                                {errors.phone?.type === 'required' && <label className="label">
                                    <span className="text-error">Mobile number is required !!</span>
                                </label>}
                                {errors.phone?.type === 'pattern' && <span className="text-error">Valid Mobile number is required !!</span>}
                            </div>
                            <div className="mt-1 form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative flex items-center">
                                    <input {...register("password", {
                                        required: true, pattern: /^\d{6,}$/
                                    })} type={eyeClose ? 'password' : 'text'} placeholder="password" name="password" className="w-full input input-bordered" />
                                    <p onClick={() => setEyeClose(!eyeClose)} className="absolute right-2 btn btn-xs">
                                        {eyeClose ? <RiEyeCloseLine className="text-2xl" /> : <RiEyeLine className="text-2xl" />}
                                    </p>
                                </div>
                                {errors.password?.type === 'required' && <span className="text-error">Password is required !!</span>}
                            </div>
                            <div className="mt-6 form-control">
                                <button className="text-white btn btn-success" type="submit">{(loading ? <><span className="loading loading-spinner text-white"></span><span className="ml-2">Processing ...</span></> : "Login")}</button>
                            </div>
                        </form>
                        <div className="flex items-center justify-center mt-3">
                            <label className="label">
                                <span className="mr-2 text-sm">New here ?</span>
                                <Link to="/register" className="text-sm font-medium text-primary label-text-alt link link-hover">
                                    Create an account
                                </Link>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
        </div>
    );
};

export default Login;
