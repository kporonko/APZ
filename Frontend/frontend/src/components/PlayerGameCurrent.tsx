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
import {DateTime} from "luxon";
import ChartTemp from "./ChartTemp";

const PlayerGameCurrent = (props:{
    player:IPlayerForTraining
}) => {

    console.log(props.player)

    const [tempData, setTempData] = React.useState<ITempDto[]>()
    const [gameCurrent, setGameCurrent] = React.useState<IGameDataCurrent>()

    const strings = new LocalizedStrings({
        en: {
            heartBeatNotOk: 'Heart beat not ok player',
        },
        ru: {
            heartBeatNotOk: 'Серцебиття не в нормі у гравця',
        }
    })

    const lang = localStorage.getItem('language') || 'en';
    strings.setLanguage(lang);

    useEffect(() => {

        // const callSubscribeToMqtt = async () => {
        //     console.log("StartSubscribeToMqtt");
        //     await SubscribeMqtt();
        //     console.log("EndSubscribeToMqtt");
        // }
        //
        // callSubscribeToMqtt()



        const callGetGameData = async () => {
            console.log("StartGetGameData");
            const token = localStorage.getItem('access_token_cybersport');
            if (token) {
                const response = await GetGameCurrent(token, props.player.gameId!);
                console.log("Game response");
                console.log(response);
                setGameCurrent(response as IGameDataCurrent);
                console.log(gameCurrent)
                if ((response as IGameDataCurrent).isLastHeartBeatOk === false) {
                    toast.error(strings.heartBeatNotOk + "\n" + props.player.lastName + " " + props.player.firstName)
                }

                console.log("gameCurrent.gameStartDate");
                const userLocale = navigator.language;
                const timeZone = "UTC"
                const date = new Date(DateTime.fromISO(response.gameStartDate!, { zone: 'Europe/Kiev', locale: userLocale }).setZone(timeZone).toISO()!).toISOString()
                const responseTemp = await GetTempDataCurrentGame(props.player!.channelId, date);
                console.log("Thingspeak response");
                console.log(responseTemp);
                setTempData(responseTemp)
            }
        }

        // const callThingSpeak = async () => {
        //     console.log("StartThingSpeak");
        //     console.log(gameCurrent, gameCurrent?.gameStartDate);
        //     if (gameCurrent && gameCurrent.gameStartDate) {
        //         console.log("gameCurrent.gameStartDate");
        //         const userLocale = navigator.language;
        //         const timeZone = "UTC"
        //         const date = new Date(DateTime.fromISO(gameCurrent?.gameStartDate!, { zone: 'Europe/Kiev', locale: userLocale }).setZone(timeZone).toISO()!).toISOString()
        //         const response = await GetTempDataCurrentGame(props.player!.channelId, date);
        //         console.log("Thingspeak response");
        //         console.log(response);
        //         setTempData(response)
        //     }
        // }

        const fetchData = async () => {
            callGetGameData();
            // callThingSpeak();
        };

// Call the combined function immediately when the component mounts
        fetchData();

        // Start a timer to call the API functions every 10 seconds
        const intervalId = setInterval(async () => {
            callGetGameData();
            // callThingSpeak();
        }, 10000);

        // Clean up the timer when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, [])

    console.log(tempData, gameCurrent)
    return (
        <div>
            <div className={"player-card-training-wrapper"}>
                <PlayerCardTrainingCurrent game={gameCurrent} player={props.player}/>
            </div>

            {<div className="charts-wrapper">
                {  tempData && <ChartHumidityCurrent tempData={tempData}/>}
                {  tempData && <ChartTemperatureCurrent tempData={tempData}/>}
                {  gameCurrent && <ChartHeartBeatCurrent gameData={gameCurrent}/>}
            </div>}
        </div>
    );
};

export default PlayerGameCurrent;