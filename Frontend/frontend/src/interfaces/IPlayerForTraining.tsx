export interface IPlayerForTraining{
    id: number,
    lastName: string;
    firstName: string;
    avatar: string;
    avgHeartBeatLastGame: number;
    isPresent: boolean;
    channelId: string;
    gameId: number|null;
}