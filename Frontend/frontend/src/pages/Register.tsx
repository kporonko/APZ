import React from 'react';
import LoginImage from "../components/LoginImage";
import AbsoluteLoginText from "../components/AbsoluteLoginText";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
    return (
        <div className="login-main-div">
            <LoginImage/>
            <AbsoluteLoginText/>
            <RegisterForm/>
        </div>
    );
};

export default Register;