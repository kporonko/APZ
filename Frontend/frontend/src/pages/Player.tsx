import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router";
import NavMenu from "../components/NavMenu";
import { IPlayer } from '../interfaces/IPlayer';
import {IPlayerInfo} from "../interfaces/IPlayerInfo";
import {DeletePlayer, GetPlayer, GetPlayerGames} from "../data/fetch";
import {toast, ToastContainer} from "react-toastify";
import LocalizedStrings from "react-localization";
import GameCard from "../components/GameCard";
import {IGameShort} from "../interfaces/IGameShort";
import {IGames} from "../interfaces/IGames";
import {confirmAlert} from "react-confirm-alert";
import EditPlayerModal from "../modals/EditPlayerModal";

const Player = () => {

    const {id} = useParams();

    const [player, setPlayer] = React.useState<IPlayerInfo>()
    const [playerGames, setPlayerGames] = React.useState<IGames>()

    const [isOpenEditModal, setIsOpenEditModal] = React.useState(false);
    const [toggleChange, setToggleChange] = React.useState(false);
    const nav = useNavigate();

    const strings = new LocalizedStrings({
        en:{
            expired:"Your session is expired. Please log in again.",
            playerDeleted: "Player deleted successfully!",
            sureDelete: "Are you sure you want to delete this player?",
            yes: "Yes",
            no: "No",
            confirm: 'Confirm To Delete',
            edit: "Edit",
            delete: "Delete",
            playerinfo: "Player info",
            games: "Games",
            badRange: "Bad range heartbeats in",
            badAvg: "Bad average heartbeat in",
            gamesRow: "games in the row",
            failedDelete:"Failed to delete player!"
        },
        ru: {
            expired:"Ваша сесія закінчилася. Будь ласка, увійдіть знову.",
            playerDeleted: "Гравець успішно видалений!",
            sureDelete: "Ви впевнені, що хочете видалити цього гравця?",
            yes: "Так",
            no: "Ні",
            confirm: 'Підтвердити видалення',
            edit: "Редагувати",
            delete: "Видалити",
            playerinfo: "Інформація про гравця",
            games: "Ігри",
            badRange: "Поганий діапазон серцебиття в",
            badAvg: "Поганий середній серцевий ритм в",
            gamesRow: "іграх поспіль",
            failedDelete:"Не вдалося видалити гравця!"
        }
    })

    const lang = localStorage.getItem('language') || 'en';
    strings.setLanguage(lang);

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
    }, [id, toggleChange])

    const handleDeletePlayer = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        confirmAlert({
            message: strings.sureDelete,
            title: strings.confirm,
            buttons:[
                {
                    label: strings.yes,
                    onClick: async () => {
                        await deleteEmployee()
                    }
                },
                {
                    label: strings.no,
                }
            ]
        })
    }

    const deleteEmployee = async () => {
        const token = localStorage.getItem("access_token_cybersport");
        if (token && id) {
            const res = await DeletePlayer(token, +id!);
            if (res === 200) {
                const notify = () => toast.success(strings.playerDeleted);
                notify();
                setTimeout(() => {
                    nav("/players")
                }, 1000)
            }
            else if (res === 401) {
                const notify = () => toast.error(strings.expired);
                notify();
                setTimeout(() => nav('/'), 2000);
            }
            else {
                const notify = () => toast.error(strings.failedDelete);
                notify();
            }
        }
        else {
            const notify = () => toast.error(strings.expired);
            notify();
            setTimeout(() => nav('/'), 2000);
        }
    }
    return (
        <div>
            <div className={!isOpenEditModal ?"" : "content-while-active-modal"}>
                <NavMenu indexActive={-1}/>
                <div className={"player-info"}>
                    <div className={"header-my-team"}>
                        {strings.playerinfo}
                    </div>
                    <div className={"flex"}>
                        <div onClick={() => {setIsOpenEditModal(true)}} className={"delete-player-btn"}>
                            {strings.edit}
                        </div>

                        <div onClick={(e) => handleDeletePlayer(e)} className="edit-player-btn">
                            {strings.delete}
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
                        {strings.games}
                    </div>
                    <div className="games-analysis-wrapper">
                        <div className={playerGames?.badAverageInRowCount === 0 ? "green games-analysis" : playerGames?.badAverageInRowCount! > 0 && playerGames?.badAverageInRowCount! < 3 ? "yellow games-analysis" : "red games-analysis"}>
                            {strings.badAvg} {playerGames?.badAverageInRowCount} {strings.gamesRow}
                        </div>
                        <div className={playerGames?.badRangeInRowCount === 0 ? "green games-analysis" : playerGames?.badRangeInRowCount! > 0 && playerGames?.badRangeInRowCount! < 3 ? "yellow games-analysis" : "red games-analysis"}>
                            {strings.badRange} {playerGames?.badRangeInRowCount} {strings.gamesRow}
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
            {isOpenEditModal && <EditPlayerModal setPlayer={setPlayer} setToggleChange={setToggleChange} toggleChange={toggleChange} player={player!} isOpen={isOpenEditModal} setIsOpen={setIsOpenEditModal}/>}
        </div>
    );
};

export default Player;