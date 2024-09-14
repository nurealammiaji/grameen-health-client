import React, { useContext, useEffect } from "react";
import HelmetAsync from './../../components/HelmetAsync/HelmetAsync';
import { useLocation, useNavigate } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {

    const { user } = useContext(AuthContext);
    const location = useLocation();
    const destination = location?.state?.from?.pathname || "/";
    const navigate = useNavigate();

    useEffect(() => {
        if (user && location?.pathname === "/register") {
            Swal.fire({
                position: "center",
                icon: "info",
                title: "Already Registered !!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate(destination, { replace: true });
        }
    }, [location, navigate, user, destination]);

    return (
        <div>
            <br /><br /><br /><br />
            <HelmetAsync title={"Register"} />
            <RegisterForm />
            <br /><br />
        </div>
    );
};

export default Register;