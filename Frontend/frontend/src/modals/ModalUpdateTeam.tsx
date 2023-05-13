import React, {useState} from 'react';
import {ITeam} from "../interfaces/ITeam";
import ModalCreateTeamTopPanel from "./ModalCreateTeamTopPanel";
import ModalCreateTeamContent from "./ModalCreateTeamContent";
import ModalUpdateTeamTopPanel from "./ModalUpdateTeamTopPanel";
import ModalUpdateTeamContent from "./ModalUpdateTeamContent";

const ModalUpdateTeam = (props:{
    team: ITeam|null|undefined,
    setTeam: React.Dispatch<React.SetStateAction<ITeam|null|undefined>>,
    setModalUpdateTeamOpen: React.Dispatch<React.SetStateAction<boolean>>,
    toggleChange: boolean,
    setToggleChange: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const closeModal = (e:any) => {
        e.stopPropagation()
        props.setModalUpdateTeamOpen(false)
    }

    const [team, setTeam] = useState<ITeam>(props.team as ITeam);

    return (
        <div onClick={(e) => closeModal(e)} className={'modal-add-post-wrapper'}>
            <div onClick={(e) => e.stopPropagation()} className="modal-add-post-content-with-panel">
                <ModalUpdateTeamTopPanel toggleChange={props.toggleChange} setToggleChange={props.setToggleChange} setModalUpdateTeamOpen={props.setModalUpdateTeamOpen} team={team}/>
                <ModalUpdateTeamContent team={team} setTeam={setTeam}/>
            </div>
        </div>
    );
};

export default ModalUpdateTeam;