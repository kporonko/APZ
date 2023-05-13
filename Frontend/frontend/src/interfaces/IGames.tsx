import {IGameShort} from "./IGameShort";

export interface IGames{
    games: IGameShort[];
    badAverageInRowCount: number;
    badRangeInRowCount: number;
}