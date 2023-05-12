import React, {useState} from 'react';
import {useNavigate} from "react-router";
import LocalizedStrings from "react-localization";
import 'react-notifications/lib/notifications.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";
import {loginUser} from "../data/fetch";
import {ILoginUser} from "../interfaces/ILoginUser";

const LoginForm = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const nav = useNavigate()

    let strings = new LocalizedStrings({
        en:{
            signIn:"Sign In To Your Account",
            login:"Login",
            enterLogin: "Enter login...",
            password:"Password",
            enterPassword: "Enter password...",
            dontHaveAcc: "I don't have an account",
            enter: "Login"
        },
        ru: {
            signIn:"Увійти в аккаунт",
            login:"Логін",
            enterLogin: "Введіть логін...",
            password:"Пароль",
            enterPassword: "Введіть пароль...",
            dontHaveAcc: "У мене немає акаунта",
            enter: "Увійти"
        }
    });

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(login, password);
        const isLogin = await loginUser({login: login, password: password} as ILoginUser)
        if(isLogin){
            nav('/team')
        }
        else{
            const notify = () => toast.error("Incorrect login or password");
            notify()
        }
    }
    return (
        <div style={{width: "-webkit-fill-available", margin: "150px 40px"}}>
            <form onSubmit={(e)=> submit(e)}>
                <h1 className="login-form-h1">{strings.signIn}</h1>
                <div className="login-form-inputwrapper">
                    <label className='login-form-label' htmlFor="Login">{strings.login}</label>
                    <input required className='login-form-input' type="text" placeholder={strings.enterLogin} id="Login" value={login} onChange={(e)=>{setLogin(e.target.value)}}/>
                </div>
                <div className="login-form-inputwrapper">
                    <label className='login-form-label' htmlFor="Password">{strings.password}</label>
                    <input required className='login-form-input' type="password" placeholder={strings.enterPassword} id="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button className="login-form-smallBtn">
                    <Link className="login-form-textDecNone" to={"/register"}>{strings.dontHaveAcc}</Link>
                </button>
                <button type="submit" disabled={login === "" || password === "" || password.length < 8 && true} className={login === "" || password === "" || password.length < 8 ? 'login-btn-disabled' : 'login-btn-active'}>
                    <h2 className='login-form-button-text'>{strings.enter}</h2>
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default LoginForm;