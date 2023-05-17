import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router";
import NavMenu from "../components/NavMenu";
import { IPlayer } from '../interfaces/IPlayer';
import {IPlayerInfo} from "../interfaces/IPlayerInfo";
import {GetPlayer, GetPlayerGames} from "../data/fetch";
import {toast, ToastContainer} from "react-toastify";
import LocalizedStrings from "react-localization";
import GameCard from "../components/GameCard";
import {IGameShort} from "../interfaces/IGameShort";
import {IGames} from "../interfaces/IGames";

const Player = () => {

    const {id} = useParams();

    const [player, setPlayer] = React.useState<IPlayerInfo>()
    const [playerGames, setPlayerGames] = React.useState<IGames>()

    const nav = useNavigate();

    const strings = new LocalizedStrings({
        en:{
            expired:"Your session is expired. Please log in again.",
        },
        ru: {
            expired:"Ваша сесія закінчилася. Будь ласка, увійдіть знову.",
        }
    })
    useEffect(() => {
        const getPlayer = async () => {
            const token = localStorage.getItem("access_token_cybersport");
            if (token && id) {
                const response = await GetPlayer(token, +id);
                if (response === 401) {
                    const notify = () => toast.error(strings.expired);
                    notify();
                    setTimeout(() => nav('/'), 2000);
                }
                setPlayer(response);
            }
            else {
                const notify = () => toast.error(strings.expired);
                notify();
                setTimeout(() => nav('/'), 2000);
            }
        }
        const getPlayerGames = async () => {
            const token = localStorage.getItem("access_token_cybersport");
            if (token && id) {
                const response = await GetPlayerGames(token, +id);
                if (response === 401) {
                    const notify = () => toast.error(strings.expired);
                    notify();
                    setTimeout(() => nav('/'), 2000);
                }
                console.log(response);
                setPlayerGames(response);
            }
            else {
                const notify = () => toast.error(strings.expired);
                notify();
                setTimeout(() => nav('/'), 2000);
            }
        }
        getPlayer();
        getPlayerGames();
    }, [id])

    return (
        <div>
            <div>
                <NavMenu indexActive={-1}/>
                <div className="player-info">
                    <div className={"header-my-team"}>
                        Player info
                    </div>
                    <div className={"flex"}>
                        <div className={"delete-player-btn"}>
                            Edit
                        </div>

                        <div className="edit-player-btn">
                            Delete
                        </div>
                    </div>
                    <div className={"player-wrapper"}>
                        <div>
                            <img className={"player-image"} src={player?.avatar} alt=""/>
                        </div>
                        <div className="player-info-wrapper">
                            <div>
                                <h1>{player?.firstName} {player?.lastName}</h1>
                            </div>
                            <div>
                                <h2>{new Date(player?.birthDate!).toLocaleDateString()}</h2>
                            </div>
                        </div>
                    </div>

                </div>
            <div>
                <div>
                    <div style={{margin: "50px 0px 20px 0px"}} className="header-my-team">
                        Games
                    </div>
                    <div className="games-analysis-wrapper">
                        <div className={playerGames?.badAverageInRowCount === 0 ? "green games-analysis" : playerGames?.badAverageInRowCount! > 0 && playerGames?.badAverageInRowCount! < 3 ? "yellow games-analysis" : "red games-analysis"}>
                            Bad average heartbeat in {playerGames?.badAverageInRowCount} games in the row
                        </div>
                        <div className={playerGames?.badRangeInRowCount === 0 ? "green games-analysis" : playerGames?.badRangeInRowCount! > 0 && playerGames?.badRangeInRowCount! < 3 ? "yellow games-analysis" : "red games-analysis"}>
                            Bad range heartbeats in {playerGames?.badRangeInRowCount} games in the row
                        </div>
                    </div>
                </div>
                {playerGames && playerGames.games && playerGames.games.length > 0 && playerGames.games.map((game, index) => (
                    <div>
                        <GameCard game={game} key={index}/>
                    </div>
                ))}
            </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Player;