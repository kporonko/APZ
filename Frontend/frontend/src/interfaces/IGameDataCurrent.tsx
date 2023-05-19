export interface IGameDataCurrent{
    id: number,
    gameStartDate: string,
    heartBeats: [
        {
            heartBeatDate: string,
            value: number
        }
    ],
    playerId: number,
    isLastHeartBeatOk: boolean,
    sensorId: string,
}