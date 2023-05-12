import React from 'react';
import LoginImage from "../components/LoginImage";
import AbsoluteLoginText from "../components/AbsoluteLoginText";
import LoginForm from "../components/LoginForm";

const Login = () => {
    return (
        <div>
            <div className="login-main-div">
                <LoginImage/>
                <AbsoluteLoginText/>
                <LoginForm/>
            </div>
        </div>
    );
};

export default Login;