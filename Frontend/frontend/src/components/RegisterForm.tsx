import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {register} from "../data/fetch";
import {IRegisterUser} from "../interfaces/IRegisterUser";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router";
import LocalizedStrings from "react-localization";

const RegisterForm = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");

    const nav = useNavigate()

    let strings = new LocalizedStrings({
        en:{
            create:"Create New Account",
            firstName: "First Name",
            enterFirstName: "Enter First Name...",
            lastName: "Last Name",
            enterLastName: "Enter Last Name...",
            login:"Login",
            enterLogin: "Enter login...",
            password:"Password",
            enterPassword: "Enter password...",
            alrHaveAcc: "I already have the account",
            enter: "Create",
            created: "Account created successfully",
            exists: "Account with this login already exists",
            somethingWrong: "Something went wrong"
        },
        ru: {
            login:"Логін",
            enterLogin: "Введіть логін...",
            password:"Пароль",
            enterPassword: "Введіть пароль...",
            create:"Створити акаунт",
            firstName: "Ім'я",
            enterFirstName: "Введіть ім'я...",
            lastName: "Прізвище",
            enterLastName: "Введіть прізвище...",
            alrHaveAcc: "У мене вже є акаунт",
            enter: "Створити",
            created: "Акаунт створено",
            exists: "Акаунт з таким логіном вже існує",
            somethingWrong: "Щось пішло не так"
        }
    });


    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isCreated = await register({login: login, password: password, firstName: firstName, lastName: lastName} as IRegisterUser)
        if(isCreated === 201){
            const notify = () => toast.success(strings.created);
            notify()
            setTimeout(() => nav('/'), 2000)
        }
        else if(isCreated === 409){
            const notify = () => toast.error(strings.exists);
            notify()
        }
        else{
            const notify = () => toast.error(strings.somethingWrong);
            notify()
        }
    }

    return (
        <div style={{width: "-webkit-fill-available", margin: "20px 40px"}}>
            <form onSubmit={(e)=> submit(e)}>
                <h1 className='login-form-h1'>{strings.create}</h1>
                <div className='register-form-flex-inputs'>
                    <div className='login-form-inputwrapper'>
                        <label className='login-form-label' htmlFor="FirstName">{strings.firstName}</label>
                        <input className='login-form-input' type="text" placeholder={strings.enterFirstName} id="FirstName" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                    </div>
                    <div className='login-form-inputwrapper'>
                        <label className='login-form-label' htmlFor="LastName">{strings.lastName}</label>
                        <input className='login-form-input' type="text" placeholder={strings.enterLastName} id="LastName" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                    </div>
                </div>
                <div className='login-form-inputwrapper'>
                    <label className='login-form-label' htmlFor="Login">{strings.login}</label>
                    <input className='login-form-input' type="text" placeholder={strings.enterLogin} id="Login" value={login} onChange={(e)=>{setLogin(e.target.value)}}/>
                </div>
                <div className='login-form-inputwrapper'>
                    <label className='login-form-label' htmlFor="Password">{strings.password}</label>
                    <input className='login-form-input' type="password" placeholder={strings.enterPassword} id="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button className='login-form-smallBtn'>
                    <Link className='login-form-textDecNone' to={"/"}>{strings.alrHaveAcc}</Link>
                </button>
                <button type="submit" disabled={login === "" || password === "" || firstName === "" || lastName === "" || password.length < 8} className={login === "" || password === "" || firstName === '' || lastName === '' || password.length < 8 ? 'login-btn-disabled' : 'login-btn-active'}>
                    <h2 className='login-form-button-text'>{strings.enter}</h2>
                </button>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default RegisterForm;