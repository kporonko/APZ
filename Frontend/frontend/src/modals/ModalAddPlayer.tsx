import React, {useState} from 'react';
import ModalCreateTeamTopPanel from "./ModalCreateTeamTopPanel";
import ModalCreateTeamContent from "./ModalCreateTeamContent";
import {ITeam} from "../interfaces/ITeam";
import {IPlayerShort} from "../interfaces/IPlayerShort";
import {IPlayer} from "../interfaces/IPlayer";
import ModalAddPlayerTopPanel from "./ModalAddPlayerTopPanel";
import ModalAddPlayerContent from "./ModalAddPlayerContent";

const ModalAddPlayer = (props:{
    setToggleChange: React.Dispatch<React.SetStateAction<boolean>>,
    toggleChange: boolean,
    setModalAddPlayer: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
    const closeModal = (e:any) => {
        e.stopPropagation()
        props.setModalAddPlayer(false)
    }

    const [player, setPlayer] = useState<IPlayer>({
        Avatar: "",
        FirstName: "",
        LastName: "",
        BirthDate: "",
        Login: "",
        Password: "",
    });

    return (
        <div onClick={(e) => closeModal(e)} className={'modal-add-post-wrapper'}>
            <div onClick={(e) => e.stopPropagation()} className="modal-add-post-content-with-panel">
                <ModalAddPlayerTopPanel toggleChange={props.toggleChange} setToggleChange={props.setToggleChange} setModalAddPlayer={props.setModalAddPlayer} player={player}/>
                <ModalAddPlayerContent player={player} setPlayer={setPlayer}/>
            </div>
        </div>
    );
};

export default ModalAddPlayer;