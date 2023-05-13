import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router";
import NavMenu from "../components/NavMenu";
import { IPlayer } from '../interfaces/IPlayer';
import {IPlayerInfo} from "../interfaces/IPlayerInfo";
import {GetPlayer} from "../data/fetch";
import {toast, ToastContainer} from "react-toastify";
import LocalizedStrings from "react-localization";

const Player = () => {

    const {id} = useParams();

    const [player, setPlayer] = React.useState<IPlayerInfo>()
    const nav = useNavigate();

    const strings = new LocalizedStrings({
        en:{
            expired:"Your session is expired. Please log in again.",
        },
        ru: {
            expired:"Ваша сесія закінчилася. Будь ласка, увійдіть знову.",
        }
    })
    useEffect(() => {
        const getPlayer = async () => {
            const token = localStorage.getItem("access_token_cybersport");
            if (token && id) {
                const response = await GetPlayer(token, +id);
                if (response === 401) {
                    const notify = () => toast.error(strings.expired);
                    notify();
                    setTimeout(() => nav('/'), 2000);
                }
                setPlayer(response);
            }
            else {
                const notify = () => toast.error(strings.expired);
                notify();
                setTimeout(() => nav('/'), 2000);
            }
        }
        getPlayer();
    }, [id])

    return (
        <div>
            <div>
                <NavMenu indexActive={-1}/>
                {id}

            {/*    Games    */}
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Player;