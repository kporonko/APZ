import React, {useEffect} from 'react';
import {IGameFull} from "../interfaces/IGameFull";
import NavMenu from "../components/NavMenu";
import {onBFCacheRestore} from "web-vitals/dist/modules/lib/onBFCacheRestore";
import LocalizedStrings from "react-localization";
import {useNavigate, useParams} from "react-router";
import {toast, ToastContainer} from "react-toastify";
import {GetGame, getTemperatureForChart} from "../data/fetch";
import GameAnalysis from "../components/GameAnalysis";
import ChartHeartBeat from "../components/ChartHeartBeat";
import ChartTemp from "../components/ChartTemp";
import ChartHumidity from "../components/ChartHumidity";
import {ITempDto} from "../interfaces/ITempDto";
import { DateTime } from 'luxon';


const Game = () => {

    const [gameData, setGameData] = React.useState<IGameFull|undefined>(undefined);
    const [tempData, setTempData] = React.useState<ITempDto[]>([]);

    const strings = new LocalizedStrings({
        en:{
            expired:"Your session is expired. Please log in again.",
            gamedata: "Game info",
            error: "Error",
            game: "Game",
            desc: "Game description",
            from: "from",
            to: "to",
            heartBeatChart: "Heartbeat chart",
            tempChart: "Temperature chart",
            humChart: "Humidity chart",
        },
        ru: {
            expired:"Ваша сесія закінчилася. Будь ласка, увійдіть знову.",
            gamedata: "Інформація про гру",
            error: "Помилка",
            game: "Гра",
            desc: "Опис гри",
            from: "з",
            to: "до",
            heartBeatChart: "Графік пульсу",
            tempChart: "Графік температури",
            humChart: "Графік вологості",
        }
    })

    const nav = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const getGameData = async () => {
            const token = localStorage.getItem('access_token_cybersport');
            if (token && id) {
                const response = await GetGame(token, +id);
                if (response === 401) {
                    const notify = () => toast.error(strings.expired);
                    notify();
                    setTimeout(() => nav('/'), 2000);
                }
                else if (response) {
                    setGameData(response);
                }
                else {
                    const notify = () => toast.error(strings.error);
                    notify();
                }
            }
            else {
                const notify = () => toast.error(strings.expired);
                notify();
                setTimeout(() => {
                    nav('/');
                },1000)
            }
        }

        const getTempData = async () => {
            if (gameData) {
                const timeZone = "UTC"
                const startDate = DateTime.fromISO(gameData.gameStartDate, { zone: 'Europe/Kiev' });
                const convertedStartDate = startDate.setZone(timeZone);
                const endDate = DateTime.fromISO(gameData.gameEndDate, { zone: 'Europe/Kiev' });
                const convertedEndDate = endDate.setZone(timeZone);
                console.log(gameData)
                const res = await getTemperatureForChart(gameData.sensorId.toString(), "AV9VRNL2O9T3RHI5", convertedStartDate.toISO()!, convertedEndDate!.toISO()!);
                setTempData(res);
            }
        }

        getGameData();
        getTempData();
    }, [])

    return (
        <div>
            <NavMenu indexActive={-1}/>
            <div className={"player-info"}>
                <div className={"header-my-team"}>
                    {strings.gamedata}
                </div>
            </div>
            <div>
                <div className={"header-chart"}>
                    {strings.tempChart}
                </div>
                <div>
                    {gameData && tempData && tempData.length > 0 && <ChartTemp data={tempData} game={gameData}/>}
                </div>

                <div className={"header-chart"}>
                    {strings.humChart}
                </div>
                <div>
                    {gameData && tempData && tempData.length > 0 && <ChartHumidity data={tempData} game={gameData}/>}
                </div>


                <div className={"header-chart"}>
                    {strings.heartBeatChart}
                </div>
                <div>
                    {gameData && <ChartHeartBeat game={gameData}/>}
                </div>


                <div className={"flex-col-desc-game"}>
                    <div className={"header-text-desc-game"}>
                        {strings.desc}:
                    </div>
                    <div>
                        {gameData?.description}
                    </div>
                    <div>
                        {strings.from} {new Date(DateTime.fromISO(gameData?.gameStartDate!, { zone: 'Europe/Kiev', locale: navigator.language }).setZone(Intl.DateTimeFormat().resolvedOptions().timeZone).toISO()!).toLocaleString()}
                    </div>
                    {gameData?.gameEndDate &&
                    <div>
                        {strings.to} {new Date(DateTime.fromISO(gameData?.gameEndDate!, { zone: 'Europe/Kiev', locale: navigator.language }).setZone(Intl.DateTimeFormat().resolvedOptions().timeZone).toISO()!).toLocaleString()}
                    </div>}
                </div>
                {gameData && <div className={"game-info"}>
                    <div className={"game-info-item"}>
                        <GameAnalysis game={gameData}/>
                    </div>
                </div>}
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Game;