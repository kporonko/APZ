import React, {useEffect} from 'react';
import NavMenu from "../components/NavMenu";
import {IPlayerShort} from "../interfaces/IPlayerShort";
import PlayerCard from "../components/PlayerCard";
import NoPlayers from "../components/NoPlayers";
import {GetPlayers} from "../data/fetch";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router";
import ModalAddPlayer from "../modals/ModalAddPlayer";
import ModalUpdateTeam from "../modals/ModalUpdateTeam";
import LocalizedStrings from "react-localization";
import ModalCreateTraining from "../modals/ModalCreateTraining";

const Players = () => {

    const [players, setPlayers] = React.useState<IPlayerShort[]>([]);

    const nav = useNavigate();

    const [modalAddPlayer, setModalAddPlayer] = React.useState<boolean>(false);
    const [isOpenAddTraining, setIsOpenAddTraining] = React.useState<boolean>(false);
    const [toggleChange, setToggleChange] = React.useState<boolean>(false);

    const strings = new LocalizedStrings({
        en:{
            expired:"Your session is expired. Please log in again.",
            myPlayers: "My Players",
            addPlayer: "Add Player",
            createGame: "Create Game",
        },
        ru: {
            expired:"Ваша сесія закінчилася. Будь ласка, увійдіть знову.",
            myPlayers: "Мої гравці",
            addPlayer: "Додати гравця",
            createGame: "Створити гру",
        }
    })

    useEffect(() => {
        const getPlayers = async () => {
            const token = localStorage.getItem("access_token_cybersport");
            if (token) {
                const response = await GetPlayers(token);
                if (response === 401) {
                    const notify = () => toast.error(strings.expired);
                    notify();
                    setTimeout(() => nav('/'), 2000);
                }
                else{
                    setPlayers(response as IPlayerShort[]);
                }

            }
            else {
                const notify = () => toast.error(strings.expired);
                notify();
                setTimeout(() => nav("/"), 2000);
            }
        }
        getPlayers();
    }, [toggleChange]);

    return (
        <div>
            <div className={modalAddPlayer || isOpenAddTraining ? "content-while-active-modal" : ""}>
                <NavMenu indexActive={1}/>
                <div className={"players-content"}>
                    <h1 className={"players-header"}>
                        {strings.myPlayers}
                    </h1>
                    <div onClick={() => setModalAddPlayer(true)} className={"add-player-button"}>
                        {strings.addPlayer}
                    </div>
                    {players.length > 0 && <div className='nav-element'>
                        <div
                            className='create-game-btn'
                            onClick={() => {setIsOpenAddTraining(true)}}
                        >
                            {strings.createGame}
                        </div>
                    </div>}
                    <div className={"players-cards-wrapper"}>
                        {players.length > 0 ? players.map((player, ind) => (
                            <PlayerCard key={ind} player={player}/>
                        )) : <NoPlayers/>}
                    </div>
                </div>
            </div>
            {modalAddPlayer && <ModalAddPlayer setToggleChange={setToggleChange} toggleChange={toggleChange} setModalAddPlayer={setModalAddPlayer}/>}
            {isOpenAddTraining && <ModalCreateTraining setPlayers={setPlayers} players={players} setIsOpenModal={setIsOpenAddTraining}/>}
            <ToastContainer/>
        </div>
    );
};

export default Players;