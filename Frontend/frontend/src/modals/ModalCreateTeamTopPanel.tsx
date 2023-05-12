import React from 'react';
import LocalizedStrings from "react-localization";
import {useNavigate} from "react-router";
import {ITeam} from "../interfaces/ITeam";
import {toast, ToastContainer} from "react-toastify";
import {CreateTeam} from "../data/fetch";

const ModalCreateTeamTopPanel = (props:{
    team: ITeam,
    setModalCreateTeamOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    let strings = new LocalizedStrings({
        en:{
            cancel:"Cancel",
            add:"Create Team",
            team:"Team",
            success:'Team created successfully',
            error:'Error creating team',
            fillAllFields:'Please fill all fields',
            expired:"Your session is expired. Please log in again.",
        },
        ua: {
            cancel: "Скасувати",
            add: "Додати пост",
            team: "Викласти",
            success:'Пост успішно додано',
            error:'Помилка додавання поста',
            fillAllFields:'Будь ласка, заповніть всі поля',
            expired:"Ваша сесія закінчилася. Будь ласка, увійдіть знову.",
        }
    });

    const nav = useNavigate();

    const handleAddPost = async () => {
        const token = localStorage.getItem('access_token_cybersport');
        if (token === null){
            const notify = () => toast.error(strings.expired);
            notify();
            setTimeout(() => nav('/'), 2000);
        }
        else if (props.team.image.length > 0 && props.team.description.length > 0) {
            const res = await CreateTeam(token!, props.team);
            console.log(res);
            if (res === 200) {
                const notify = () => toast.success(strings.success);
                notify();
                setTimeout(() => props.setModalCreateTeamOpen(false), 1000);
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
                <div onClick={() => props.setModalCreateTeamOpen(false)} className="modal-add-post-top-panel-text">
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

export default ModalCreateTeamTopPanel;