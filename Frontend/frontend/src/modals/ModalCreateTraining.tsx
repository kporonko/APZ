import React from 'react';
import ModalCreateTeamTopPanel from "./ModalCreateTeamTopPanel";
import ModalCreateTeamContent from "./ModalCreateTeamContent";
import {IPlayerShort} from "../interfaces/IPlayerShort";
import ModalCreateTrainingTopPanel from "./ModalCreateTrainingTopPanel";
import ModalCreateTrainingContent from "./ModalCreateTrainingContent";

const ModalCreateTraining = (props:{
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    players: IPlayerShort[],
    setPlayers: React.Dispatch<React.SetStateAction<IPlayerShort[]>>,
}) => {

    const closeModal = (e:any) => {
        e.stopPropagation()
        props.setIsOpenModal(false)
    }

    return (
        <div onClick={(e) => closeModal(e)} className={'modal-add-post-wrapper'}>
            <div onClick={(e) => e.stopPropagation()} className="modal-add-post-content-with-panel">
                <ModalCreateTrainingTopPanel setIsOpenModal={props.setIsOpenModal}/>
                <ModalCreateTrainingContent players={props.players} setPlayers={props.setPlayers}/>
            </div>
        </div>
    );
};

export default ModalCreateTraining;