import {IGame} from "./IGame";

export interface IPlayerInfo{
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    birthDate: string;
    games: IGame[];
}