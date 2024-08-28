import React, { useContext, useState } from 'react';
import { AuthContext } from './../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import HelmetAsync from './../../components/HelmetAsync/HelmetAsync';
import { TbEye, TbEyeClosed } from 'react-icons/tb';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { setAuthenticated, setLoading, login } = useContext(AuthContext);
    const [eyeClose, setEyeClose] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || "/";

    const handleLogin = async (data) => {
        const { email, password } = data;
        login(email, password)
            .then(({ data }) => {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('userId', data.id);
                setAuthenticated(true);
                setLoading(false);
                navigate(from, { replace: true });
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    return (
        <div>
            <HelmetAsync title={"Login"} />
            <div className="hero">
                <div className="p-10 mx-auto my-auto shadow-2xl rounded-3xl md:w-6/12 hero-content">
                    <div className="mx-auto md:w-10/12">
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <div className="text-center">
                                <h3 className="text-2xl font-semibold">Login</h3>
                            </div>
                            <br />
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" placeholder="email" name="email" className="input input-bordered" />
                                {errors.email?.type === 'required' && <span className="text-error">Email is required !!</span>}
                            </div>
                            <div className="mt-2 form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative flex items-center">
                                    <input {...register("password", { required: true })} type={eyeClose ? 'password' : 'text'} placeholder="password" name="password" className="w-full input input-bordered" />
                                    <p onClick={() => setEyeClose(!eyeClose)} className="absolute right-2 btn btn-xs">
                                        {eyeClose ? <TbEyeClosed className="text-2xl" /> : <TbEye className="text-2xl" />}
                                    </p>
                                </div>
                                {errors.password?.type === 'required' && <span className="text-error">Password is required !!</span>}
                            </div>
                            <div className="mt-6 form-control">
                                <button className="btn btn-neutral" type="submit">Login</button>
                            </div>
                        </form>
                        <div className="flex items-center justify-center mt-3">
                            <label className="label">
                                <span className="mr-2 text-sm">New here?</span>
                                <Link to="/register" className="text-sm font-medium text-primary label-text-alt link link-hover">
                                    Create a new account
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
