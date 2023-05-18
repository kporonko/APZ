export interface IGameFull{
    id: number;
    gameStartDate: string,
    gameEndDate: string,
    isPlayerAbsent: boolean,
    description: string,
    heartBeats: [
        {
            heartBeatDate: string,
            value: number
        }
    ],
    playerId: number,
    analysis: {
        isRangeGood: boolean,
        timesMoreMaxHeartBeat: number,
        timesLowerMinimumHeartBeat: number,
        isAverageHigher: boolean,
        isAverageLower: boolean
    },
    sensorId: number,
}