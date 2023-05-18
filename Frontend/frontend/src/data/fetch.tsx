import {ILoginUser} from "../interfaces/ILoginUser";
import {IRegisterUser} from "../interfaces/IRegisterUser";
import {ITeam} from "../interfaces/ITeam";
import {IPlayer} from "../interfaces/IPlayer";
import {IPlayerInfo} from "../interfaces/IPlayerInfo";
import {ITempDto} from "../interfaces/ITempDto";
import {IGame} from "../interfaces/IGame";
import {IGameFull} from "../interfaces/IGameFull";

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
    try {
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
    catch (error: any) {
        console.log(error);
        return error;
    }
}

export const DeleteTeam = async (token: string) => {
    try {
        const response = await fetch(`${BASE_URL}/Team/team`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });
        const res = response.status;
        return res;
    }
    catch (error: any) {
        console.log(error);
        return error;
    }
}

export const UpdateTeam = async (token: string, team: ITeam) => {
    console.log(team);
    try {
        const response = await fetch(`${BASE_URL}/Team/team`, {
            method: 'PUT',
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
    catch (error: any) {
        console.log(error);
        return error;
    }
}


export const GetPlayers = async (token: string) => {
    try {
        const response = await fetch(`${BASE_URL}/Team/players`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }});

        if (response.status === 401) {
            return response.status;
        }
        const body = await response.json();
        const res = body;
        return res;
    }
    catch (error: any) {
        console.log(error);
        return error;
    }
}


export const AddPlayer = async (token: string, player: IPlayer) => {
    console.log(player);
    try {
        const response = await fetch(`${BASE_URL}/Team/player`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                lastName: player.LastName,
                firstName: player.FirstName,
                birthDate: player.BirthDate,
                avatar: player.Avatar,
                login: player.Login,
                password: player.Password,
            })
        });
        console.log(response);
        const res = response.status;
        return res;
    }
    catch (error: any) {
        console.log(error);
        return error;
    }
}


export const GetPlayer = async (token: string, id: number) => {
    try {
        const response = await fetch(`${BASE_URL}/Team/player/${id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }});

        if (response.status === 401) {
            return response.status;
        }
        const body = await response.json();
        const res = body;
        return res;
    }
    catch (error: any) {
        console.log(error);
        return error;
    }
}

export const GetPlayerGames = async (token: string, id: number) => {
    try {
        const response = await fetch(`${BASE_URL}/Game/games/player/${id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }});

        if (response.status === 401) {
            return response.status;
        }
        const body = await response.json();
        const res = body;
        return res;
    }
    catch (error: any) {
        console.log(error);
        return error;
    }
}


export const DeletePlayer = async (token: string, playerId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/Team/player`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                "playerId": playerId
            })
        });
        const res = response.status;
        return res;
    }
    catch (error: any) {
        console.log(error);
        return error;
    }
}


export const EditPlayer = async (token: string, player: IPlayerInfo) => {
    try {
        const response = await fetch(`${BASE_URL}/Team/player`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                "id": player.id,
                "lastName": player.lastName,
                "firstName": player.firstName,
                "avatar": player.avatar,
            })
        });

        const res = response.status;
        return res;
    }
    catch (error: any) {
        console.log(error);
        return error;
    }
}

export const GetGame = async (token: string, id: number) => {
    try {
        const response = await fetch(`${BASE_URL}/Game/game/${id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }});

        if (response.status === 401) {
            return response.status;
        }
        const body = await response.json();
        const res = body;
        return res;
    }
    catch (error: any) {
        console.log(error);
        return error;
    }
}

export const getTemperatureForChart = async (ip: string, key: string, start: string, end: string) => {
    const response = await fetch(`${BASE_URL_THINGSPEAK}channels/${ip}/feeds.json?api_key=${key}&start=${start}&end=${end}`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }});

    const body = await response.json();
    const res = body.feeds as ITempDto[];
    console.log(res)
    return res;
}

export const AddGame = async (token: string, playerId: number, sensorId: string) => {
    console.log(token, playerId, sensorId);
    try {
        const response = await fetch(`${BASE_URL}/Game/game`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                playerId: playerId,
                sensorId: sensorId,
            })
        });
        console.log(response);
        const res = await response.json();
        console.log(res);
        return res.id;
    }
    catch (error: any) {
        console.log(error);
        return error;
    }
}


export const SendGameId = async (token: string, gameId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/Game/gameid`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                id: gameId,
            })
        });
        console.log(response);
        const res = response.status;
        return res;
    }
    catch (error: any) {
        console.log(error);
        return error;
    }
}
