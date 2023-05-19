import React, {useEffect} from 'react';
import PlayerCardTrainingCurrent from "./PlayerCardTrainingCurrent";
import {IPlayerForTraining} from "../interfaces/IPlayerForTraining";
import {IGameDataCurrent} from "../interfaces/IGameDataCurrent";
import {ITempDto} from "../interfaces/ITempDto";
import {EndGame, GetGameCurrent, GetTempDataCurrentGame, SubscribeMqtt} from "../data/fetch";
import ChartHumidityCurrent from "./ChartHumidityCurrent";
import ChartTemperatureCurrent from "./ChartTemperatureCurrent";
import ChartHeartBeatCurrent from "./ChartHeartBeatCurrent";
import LocalizedStrings from "react-localization";
import {toast} from "react-toastify";

const PlayerGameCurrent = (props:{
    player:IPlayerForTraining
}) => {

    console.log(props.player)

    const [tempData, setTempData] = React.useState<ITempDto[]>()
    const [gameCurrent, setGameCurrent] = React.useState<IGameDataCurrent>()


    useEffect(() => {

        const callSubscribeToMqtt = async () => {
            console.log("StartSubscribeToMqtt");
            await SubscribeMqtt();
            console.log("EndSubscribeToMqtt");
        }

        callSubscribeToMqtt()

        const callThingSpeak = async () => {
            const response = await GetTempDataCurrentGame(props.player!.channelId);
            console.log("Thingspeak response");
            console.log(response);
            setTempData(response)
        }

        const callGetGameData = async () => {
            const token = localStorage.getItem('access_token_cybersport');
            if (token) {
                const response = await GetGameCurrent(token, props.player.gameId!);
                console.log("Game response");
                console.log(response);
                setGameCurrent(response);
            }
        }
        // Call the API functions immediately when the component mounts
        callThingSpeak();
        callGetGameData();

        // Start a timer to call the API functions every 10 seconds
        const intervalId = setInterval(() => {
            callThingSpeak();
            callGetGameData();
        }, 10000);

        // Clean up the timer when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, [])

    return (
        <div>
            <div className={"player-card-training-wrapper"}>
                <PlayerCardTrainingCurrent game={gameCurrent} player={props.player}/>
            </div>

            {tempData && gameCurrent && <div className="charts-wrapper">
                <ChartHumidityCurrent tempData={tempData}/>
                <ChartTemperatureCurrent tempData={tempData}/>
                <ChartHeartBeatCurrent gameData={gameCurrent}/>
            </div>}
        </div>
    );
};

export default PlayerGameCurrent;