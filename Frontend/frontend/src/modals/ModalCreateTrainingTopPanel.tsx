import React from 'react';
import LocalizedStrings from "react-localization";
import {useNavigate} from "react-router";
import {toast, ToastContainer} from "react-toastify";
import {CreateTeam} from "../data/fetch";
import {IPlayerForTraining} from "../interfaces/IPlayerForTraining";
import {IPlayerShort} from "../interfaces/IPlayerShort";

const ModalCreateTrainingTopPanel = (props:{
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    players: IPlayerShort[],
}) => {



    return (
        <div>

        </div>
    );
};

export default ModalCreateTrainingTopPanel;