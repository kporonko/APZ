import React, {useState} from 'react';
import {ITeam} from "../interfaces/ITeam";
import ModalCreateTeamTopPanel from "./ModalCreateTeamTopPanel";
import ModalCreateTeamContent from "./ModalCreateTeamContent";

const ModalCreateTeam = (props:{
    team: ITeam|null|undefined,
    setTeam: React.Dispatch<React.SetStateAction<ITeam|null|undefined>>,
    setModalCreateTeamOpen: React.Dispatch<React.SetStateAction<boolean>>,
    toggleChange: boolean,
    setToggleChange: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const closeModal = (e:any) => {
        e.stopPropagation()
        props.setModalCreateTeamOpen(false)
    }

    const [team, setTeam] = useState<ITeam>({
        image: "",
        description: "",
        name: "",
        id: 0
    });



    return (
        <div onClick={(e) => closeModal(e)} className={'modal-add-post-wrapper'}>
            <div onClick={(e) => e.stopPropagation()} className="modal-add-post-content-with-panel">
                <ModalCreateTeamTopPanel toggleChange={props.toggleChange} setToggleChange={props.setToggleChange} setModalCreateTeamOpen={props.setModalCreateTeamOpen} team={team}/>
                <ModalCreateTeamContent team={team} setTeam={setTeam}/>
            </div>
        </div>
    );
};

export default ModalCreateTeam;