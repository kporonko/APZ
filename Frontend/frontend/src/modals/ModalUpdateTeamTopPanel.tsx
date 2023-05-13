import React from 'react';
import {ITeam} from "../interfaces/ITeam";
import LocalizedStrings from "react-localization";
import {useNavigate} from "react-router";
import {toast, ToastContainer} from "react-toastify";
import {CreateTeam, UpdateTeam} from "../data/fetch";

const ModalUpdateTeamTopPanel = (props:{
    team: ITeam,
    setModalUpdateTeamOpen: React.Dispatch<React.SetStateAction<boolean>>,
    toggleChange: boolean,
    setToggleChange: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    let strings = new LocalizedStrings({
        en:{
            cancel:"Cancel",
            add:"Update Team",
            team:"Update",
            success:'Team created successfully',
            error:'Error creating team',
            fillAllFields:'Please fill all fields',
            expired:"Your session is expired. Please log in again.",
        },
        ru: {
            cancel: "Скасувати",
            add: "Оновити команду",
            team: "Оновити",
            success:'Команду успшно оновлено',
            error:'Помилка оновлення команди',
            fillAllFields:'Будь ласка, заповніть всі поля',
            expired:"Ваша сесія закінчилася. Будь ласка, увійдіть знову.",
        }
    });

    const nav = useNavigate();

    const handleUpdateTeam = async () => {
        const token = localStorage.getItem('access_token_cybersport');
        if (token === null){
            const notify = () => toast.error(strings.expired);
            notify();
            setTimeout(() => nav('/'), 2000);
        }
        else if (props.team.image.length > 0 && props.team.description.length > 0) {
            const res = await UpdateTeam(token!, props.team);
            console.log(res);
            if (res === 200) {
                const notify = () => toast.success(strings.success);
                notify();
                props.setToggleChange(!props.toggleChange);
                setTimeout(() => props.setModalUpdateTeamOpen(false), 1000);
            }
            else if (res === 401) {
                const notify = () => toast.error(strings.expired);
                notify();
                setTimeout(() => nav('/'), 2000);
            }
            else{
                const notify = () => toast.error(strings.error);
                notify();
            }
        }
        else{
            const notify = () => toast.warning(strings.fillAllFields);
            notify();
        }
    }

    return (
        <div>
            <div className='modal-add-post-top-panel-wrapper'>
                <div onClick={() => props.setModalUpdateTeamOpen(false)} className="modal-add-post-top-panel-text">
                    {strings.cancel}
                </div>
                <div className="modal-add-post-top-panel-header">
                    {strings.add}
                </div>
                <div onClick={handleUpdateTeam} className="modal-add-post-top-panel-text">
                    {strings.team}
                </div>
            </div>
            <ToastContainer
                className={`toast-container`}
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default ModalUpdateTeamTopPanel;