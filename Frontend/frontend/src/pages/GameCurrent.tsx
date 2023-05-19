import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router";
import {IPlayerForTraining} from "../interfaces/IPlayerForTraining";
import { useLocation } from "react-router-dom";
import LocalizedStrings from "react-localization";
import Player from "./Player";
import PlayerCard from "../components/PlayerCard";
import PlayerCardTrainingCurrent from "../components/PlayerCardTrainingCurrent";
import {ITempDto} from "../interfaces/ITempDto";
import {IGameDataCurrent} from "../interfaces/IGameDataCurrent";
import {EndGame, GetGame, GetTempDataCurrentGame} from "../data/fetch";
import PlayerGameCurrent from "../components/PlayerGameCurrent";
import {toast, ToastContainer} from "react-toastify";
import {confirmAlert} from "react-confirm-alert";

const GameCurrent = () => {

    const location = useLocation();
    let players: IPlayerForTraining[] = location.state.players;
    console.log("players");
    console.log(players);

    const strings = new LocalizedStrings({
        en: {
            game: 'Game',
            endGame: 'End game',
            endSuccess: 'Game ended successfully',
            sureEnd: "Are you sure you want to end the game?",
            yes: "Yes",
            no: "No",
            confirm: 'Confirm To End',
        },
        ru: {
            game: 'Гра',
            endGame: 'Закінчити гру',
            endSuccess: 'Гру успішно завершено',
            sureEnd: "Ви впевнені, що хочете завершити гру?",
            yes: "Так",
            no: "Ні",
            confirm: 'Підтвердити завершення',
        }
    })

    const nav = useNavigate();

    const handleEndGame = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        confirmAlert({
            message: strings.sureEnd,
            title: strings.confirm,
            buttons:[
                {
                    label: strings.yes,
                    onClick: async () => {
                        await EndGameWrapper()
                    }
                },
                {
                    label: strings.no,
                }
            ]
        })
    }

    const EndGameWrapper = async () => {
        const token = localStorage.getItem('access_token_cybersport')
        if (token) {
            for (const player of players) {
                const res = await EndGame(token, player.gameId!)
                console.log(res)
                if (res === 200) {
                    const notify = () => toast.success(strings.endSuccess);
                    notify();
                    setTimeout(() => nav(`/team`), 2000);
                }
                else {
                    const notify = () => toast.error("Error");
                    notify();
                }
            }

        }
    }

    return (
        <div>
            <div className={"header-my-team"}>
                {strings.game}
            </div>

            <div>
                {players.map((player) => {
                    return (
                        <div>
                            <PlayerGameCurrent player={player}/>
                        </div>
                    )
                })}
            </div>

            <div className="end-game-btn" onClick={handleEndGame}>
                <div>
                    {strings.endGame}
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default GameCurrent;