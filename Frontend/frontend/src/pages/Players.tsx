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

const Players = () => {

    const [players, setPlayers] = React.useState<IPlayerShort[]>([]);

    const nav = useNavigate();

    const [modalAddPlayer, setModalAddPlayer] = React.useState<boolean>(false);
    const [toggleChange, setToggleChange] = React.useState<boolean>(false);

    useEffect(() => {
        const getPlayers = async () => {
            const token = localStorage.getItem("access_token_cybersport");
            if (token) {
                const response = await GetPlayers(token);
                if (response === 401) {
                    const notify = () => toast.error("Your session is expired. Please log in again.");
                    notify();
                    setTimeout(() => nav('/'), 2000);
                }
                else{
                    console.log(response);
                    setPlayers(response as IPlayerShort[]);
                }

            }
            else {
                const notify = () => toast.error("Ваша сесія закінчилася. Будь ласка, увійдіть знову.");
                notify();
                setTimeout(() => nav("/"), 2000);
            }
        }
        getPlayers();
    }, [toggleChange]);

    return (
        <div>
            <div className={modalAddPlayer ? "content-while-active-modal" : ""}>
                <NavMenu indexActive={1}/>
                <div className={"players-content"}>
                    <h1 className={"players-header"}>
                        My Players
                    </h1>
                    <div onClick={() => setModalAddPlayer(true)} className={"add-player-button"}>
                        Add player
                    </div>
                    <div className={"players-cards-wrapper"}>
                        {players.length > 0 ? players.map((player, ind) => (
                            <PlayerCard key={ind} player={player}/>
                        )) : <NoPlayers/>}
                    </div>
                </div>
            </div>
            {modalAddPlayer && <ModalAddPlayer setToggleChange={setToggleChange} toggleChange={toggleChange} setModalAddPlayer={setModalAddPlayer}/>}
            <ToastContainer/>
        </div>
    );
};

export default Players;