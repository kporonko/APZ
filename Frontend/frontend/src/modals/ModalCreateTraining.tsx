import React from 'react';
import {IPlayerShort} from "../interfaces/IPlayerShort";
import ModalCreateGameContent from "./ModalCreateTrainingContent";
import {IPlayerForTraining} from "../interfaces/IPlayerForTraining";
import {toast, ToastContainer} from "react-toastify";
import LocalizedStrings from "react-localization";
import {useNavigate} from "react-router";

const ModalCreateTraining = (props:{
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    players: IPlayerShort[],
    setPlayers: React.Dispatch<React.SetStateAction<IPlayerShort[]|undefined>>,
}) => {

    const strings = new LocalizedStrings({
        en:{
            cancel:"Cancel",
            add:"Create game",
            team:"Create",
        },
        ru: {
            cancel: "Скасувати",
            add: "Створити гру",
            team: "Створити",
        }
    })

    const lang = localStorage.getItem('language') || 'en';
    strings.setLanguage(lang);

    const closeModal = (e:any) => {
        e.stopPropagation()

        if (!players.some((player) => player.isPresent)) {
            props.setIsOpenModal(false)
        }
    }

    const navigate = useNavigate()

    const handleCreateTraining = () => {
        const playersForTraining = players.filter((player) => {
            return player.isPresent === true
        })
        console.log(playersForTraining)

        navigate('/game/current', {
            state: {
                players: playersForTraining,
            }
        })
    }

    const [players, setPlayers] = React.useState<IPlayerForTraining[]>(props.players as IPlayerForTraining[])


    return (
        <div onClick={(e) => closeModal(e)} className={'modal-add-post-wrapper'}>
            <div onClick={(e) => e.stopPropagation()} className="modal-add-post-content-with-panel">
                <div className='modal-add-post-top-panel-wrapper'>
                    <div onClick={() => props.setIsOpenModal(false)} className="modal-add-post-top-panel-text">
                        {strings.cancel}
                    </div>
                    <div className="modal-add-post-top-panel-header">
                        {strings.add}
                    </div>
                    <div onClick={handleCreateTraining} className="modal-add-post-top-panel-text">
                        {strings.team}
                    </div>
                </div>
                <ToastContainer/>
                <ModalCreateGameContent setIsOpenModal={props.setIsOpenModal} players={players} setPlayers={setPlayers}/>
            </div>
        </div>
    );
};

export default ModalCreateTraining;