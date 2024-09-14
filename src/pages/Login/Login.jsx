import React, { useContext, useEffect } from 'react';
import HelmetAsync from './../../components/HelmetAsync/HelmetAsync';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoginForm from '../../components/LoginForm/LoginForm';
import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {

    const { user } = useContext(AuthContext);

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
    }, [location, navigate, user, destination]);

    return (
        <div>
            <br /><br /><br /><br />
            <HelmetAsync title={"Login"} />
            <LoginForm />
            <br /><br />
        </div>
    );
};

export default Login;
