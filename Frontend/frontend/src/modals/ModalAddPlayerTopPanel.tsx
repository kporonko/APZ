import React from 'react';
import {IPlayer} from "../interfaces/IPlayer";
import LocalizedStrings from "react-localization";
import {useNavigate} from "react-router";
import {toast, ToastContainer} from "react-toastify";
import {AddPlayer, CreateTeam} from "../data/fetch";

const ModalAddPlayerTopPanel = (props:{
    setToggleChange: React.Dispatch<React.SetStateAction<boolean>>,
    toggleChange: boolean,
    setModalAddPlayer: React.Dispatch<React.SetStateAction<boolean>>,
    player: IPlayer
}) => {
    let strings = new LocalizedStrings({
        en:{
            cancel:"Cancel",
            add:"Add Player",
            team:"Save",
            success:'Player added successfully',
            error:'Error creating player',
            fillAllFields:'Please fill all fields',
            expired:"Your session is expired. Please log in again.",
        },
        ru: {
            cancel: "Скасувати",
            add: "Створити гравця",
            team: "Зберегти",
            success:'Гравця успішно створено',
            error:'Помилка додавання гравця',
            fillAllFields:'Будь ласка, заповніть всі поля',
            expired:"Ваша сесія закінчилася. Будь ласка, увійдіть знову.",
        }
    });

    const lang = localStorage.getItem('language') || 'en';
    strings.setLanguage(lang);

    const nav = useNavigate();

    const handleAddPost = async () => {
        const token = localStorage.getItem('access_token_cybersport');
        if (token === null){
            const notify = () => toast.error(strings.expired);
            notify();
            setTimeout(() => nav('/'), 2000);
        }
        else if (props.player.Avatar.length > 0 && props.player.BirthDate.length > 0 && props.player.FirstName.length > 0 && props.player.LastName.length > 0 && props.player.Login.length > 0 && props.player.Password.length > 0) {
            const res = await AddPlayer(token!, props.player);
            console.log(res);
            if (res === 200) {
                const notify = () => toast.success(strings.success);
                notify();
                props.setToggleChange(!props.toggleChange);
                setTimeout(() => props.setModalAddPlayer(false), 1000);
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
                <div onClick={() => props.setModalAddPlayer(false)} className="modal-add-post-top-panel-text">
                    {strings.cancel}
                </div>
                <div className="modal-add-post-top-panel-header">
                    {strings.add}
                </div>
                <div onClick={handleAddPost} className="modal-add-post-top-panel-text">
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

export default ModalAddPlayerTopPanel;