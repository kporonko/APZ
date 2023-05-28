import React from 'react';
import {IPlayerInfo} from "../interfaces/IPlayerInfo";
import LocalizedStrings from "react-localization";
import {useNavigate} from "react-router";
import {toast, ToastContainer} from "react-toastify";
import {AddPlayer, EditPlayer} from "../data/fetch";
import {logDOM} from "@testing-library/react";

const EditPlayerModalTopPanel = (props:{
    toggleChange: boolean,
    setToggleChange: React.Dispatch<React.SetStateAction<boolean>>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    player: IPlayerInfo,
}) => {
    let strings = new LocalizedStrings({
        en:{
            cancel:"Cancel",
            add:"Edit Player",
            team:"Save",
            success:'Player edited successfully',
            error:'Error editing player',
            fillAllFields:'Please fill all fields',
            expired:"Your session is expired. Please log in again.",
        },
        ru: {
            cancel: "Скасувати",
            add: "Оновити гравця",
            team: "Зберегти",
            success:'Гравця успішно оновлено',
            error:'Помилка оновлення гравця',
            fillAllFields:'Будь ласка, заповніть всі поля',
            expired:"Ваша сесія закінчилася. Будь ласка, увійдіть знову.",
        }
    });

    const lang = localStorage.getItem('language') || 'en';
    strings.setLanguage(lang);

    const nav = useNavigate();

    const handleEditPlayer = async () => {
        const token = localStorage.getItem('access_token_cybersport');
        if (token === null){
            const notify = () => toast.error(strings.expired);
            notify();
            setTimeout(() => nav('/'), 2000);
        }
        else if (props.player.avatar.length > 0 && props.player.firstName.length > 0 && props.player.lastName.length > 0) {
            console.log("HERE 1")
            const res = await EditPlayer(token!, props.player);
            if (res === 200) {
                const notify = () => toast.success(strings.success);
                notify();
                props.setToggleChange(!props.toggleChange);
                setTimeout(() => props.setIsOpen(false), 1000);
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
                <div onClick={() => props.setIsOpen(false)} className="modal-add-post-top-panel-text">
                    {strings.cancel}
                </div>
                <div className="modal-add-post-top-panel-header">
                    {strings.add}
                </div>
                <div onClick={handleEditPlayer} className="modal-add-post-top-panel-text">
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

export default EditPlayerModalTopPanel;