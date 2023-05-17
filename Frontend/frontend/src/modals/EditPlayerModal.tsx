import React from 'react';
import {IPlayer} from "../interfaces/IPlayer";
import {IPlayerInfo} from "../interfaces/IPlayerInfo";
import ModalAddPlayerTopPanel from "./ModalAddPlayerTopPanel";
import ModalAddPlayerContent from "./ModalAddPlayerContent";
import EditPlayerModalContent from "./EditPlayerModalContent";
import EditPlayerModalTopPanel from "./EditPlayerModalTopPanel";

const EditPlayerModal = (props:{
    player: IPlayerInfo,
    setPlayer: React.Dispatch<React.SetStateAction<IPlayerInfo|undefined>>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean,
    setToggleChange: React.Dispatch<React.SetStateAction<boolean>>,
    toggleChange: boolean,
}) => {

    const [player, setPlayer] = React.useState<IPlayerInfo>(props.player);

    const closeModal = (e:any) => {
        e.stopPropagation()
        props.setIsOpen(false)
    }

    return (
        <div onClick={(e) => closeModal(e)} className={'modal-add-post-wrapper'}>
            <div onClick={(e) => e.stopPropagation()} className="modal-add-post-content-with-panel">
                <EditPlayerModalTopPanel toggleChange={props.toggleChange} setToggleChange={props.setToggleChange} setIsOpen={props.setIsOpen} player={player}/>
                <EditPlayerModalContent player={player} setPlayer={setPlayer}/>
            </div>
        </div>
    );
};

export default EditPlayerModal;