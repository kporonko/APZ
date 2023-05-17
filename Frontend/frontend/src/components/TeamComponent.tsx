import React from 'react';
import {ITeam} from "../interfaces/ITeam";
import LocalizedStrings from "react-localization";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useNavigate} from "react-router";
import {toast, ToastContainer} from "react-toastify";
import {DeleteTeam} from "../data/fetch"; // Import css


const TeamComponent = (props:{
    team: ITeam,
    toggleChange: boolean,
    setToggleChange: React.Dispatch<React.SetStateAction<boolean>>,
    setModalUpdateTeamOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) => {

    let strings = new LocalizedStrings({
        en:{
            edit:"Edit Team",
            delete:"Delete Team",
            myTeam:"My Team",
            successDelete:"Team was successfully deleted.",
            failedDelete:"Error while deleting team.",
            expired:"Your session is expired. Please log in again.",
            sureDelete:"Are you sure you want to delete this team?",
            yes:"Yes",
            no:"No",
            confirm:"Confirm",
        },
        ru: {
            edit:"Редагувати Команду",
            delete:"Видалити Команду",
            myTeam:"Моя Команда",
            successDelete:"Команда була успішно видалена.",
            failedDelete:"Помилка при видаленні команди.",
            expired:"Ваша сесія закінчилася. Будь ласка, увійдіть знову.",
            sureDelete:"Ви впевнені, що хочете видалити цю команду?",
            yes:"Так",
            no:"Ні",
            confirm:"Підтвердити",
        }
    });

    const handleDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        confirmAlert({
            message:strings.sureDelete,
            title: strings.confirm,
            buttons:[
                {
                    label: strings.yes,
                    onClick: async () => {
                        await deleteTeam()
                    }
                },
                {
                    label: strings.no,
                }
            ]
        })
    }

    const nav = useNavigate();

    const deleteTeam = async () => {
        let token = localStorage.getItem('access_token_cybersport');
        if (token) {
            const res = await DeleteTeam(token);
            console.log(res);
            if (res === 200) {
                const notify = () => toast.success(strings.successDelete);
                notify();
                props.setToggleChange(!props.toggleChange);
            }
            else {
                const notify = () => toast.error(strings.failedDelete);
                notify();
            }
        }
        else {
            const notify = () => toast.error(strings.expired);
            notify();
            setTimeout(() => {
                nav("/")
            }, 1000)
        }

    }

    return (
        <div className={"team-wrapper"}>
            <div className={"header-my-team"}>
                {strings.myTeam}
            </div>
            <div className={"team-page-top"}>
                <div className={"team-page-top-image"}>
                    <img className={"team-image"} src={props.team.image} alt=""/>
                </div>
                <div className={"team-page-top-info"}>
                    <h1>{props.team.name}</h1>
                    <p>{props.team.description}</p>
                </div>
                <div className="team-btns-wrapper">
                    <div onClick={() => props.setModalUpdateTeamOpen(true)} className="edit-team-button">
                        {strings.edit}
                    </div>
                    <div onClick={(e) => handleDelete(e)} className="delete-team-button">
                        {strings.delete}
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default TeamComponent;