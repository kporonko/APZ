import {ILoginUser} from "../interfaces/ILoginUser";
import {IRegisterUser} from "../interfaces/IRegisterUser";

export const BASE_URL = 'https://localhost:7061/api';
export const BASE_URL_THINGSPEAK = "https://api.thingspeak.com/"

export const loginUser = async (user: ILoginUser) => {
    const response = await fetch(`${BASE_URL}/Auth/manager/login`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: user.login,
            password: user.password
        })
    });

    const body = await response.json();
    if (response.status === 200) {
        localStorage.setItem("access_token_cybersport", body.token)
        return true;
    }
    return false;
}

export const register = async (user: IRegisterUser) => {
    const response = await fetch(`${BASE_URL}/Auth/register`, {
        method: 'POST',
        body: JSON.stringify({
            "login": user.login,
            "password": user.password,
            "lastName": user.lastName,
            "firstName": user.firstName,
        }),
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
        }});

    console.log(response);
    console.log(response.status);
    return response.status;
}