import {ILoginUser} from "../interfaces/ILoginUser";
import {IRegisterUser} from "../interfaces/IRegisterUser";
import {ITeam} from "../interfaces/ITeam";

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

export const GetTeam = async (token: string) => {
    const response = await fetch(`${BASE_URL}/Team/team`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }});

    const body = await response.json();
    const res = body;
    return res;
}

export const CreateTeam = async (token: string, team: ITeam) => {
    console.log(team);
    const response = await fetch(`${BASE_URL}/Team/team`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
            "name": team.name,
            "description": team.description,
            "image": team.image,
        })
    });
    const res = response.status;
    return res;
}