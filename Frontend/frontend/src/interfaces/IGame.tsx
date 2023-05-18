import {IHeartBeat} from "./IHeartBeat";

export interface IGame{
    id: number;
    gameStartDate: string;
    gameEndDate: string;
    description: string;
    heartBeats: IHeartBeat[];
    playerId: number;
    isLastHeartBeatOk: boolean;
    sensorId: number;
}