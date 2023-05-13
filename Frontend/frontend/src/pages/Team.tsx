import React, {useEffect} from 'react';
import NavMenu from "../components/NavMenu";
import {ITeam} from "../interfaces/ITeam";
import {GetTeam} from "../data/fetch";
import Loader from "../components/Loader";
import TeamNotFound from "../components/TeamNotFound";
import TeamComponent from "../components/TeamComponent";
import ModalCreateTeam from "../modals/ModalCreateTeam";
import {toast} from "react-toastify";
import LocalizedStrings from "react-localization";
import {useNavigate} from "react-router";
import ModalUpdateTeam from "../modals/ModalUpdateTeam";

const Team = () => {

    const [team, setTeam] = React.useState<ITeam|null|undefined>(undefined);
    const [modalCreateTeamOpen, setModalCreateTeamOpen] = React.useState<boolean>(false);
    const [modalUpdateTeamOpen, setModalUpdateTeamOpen] = React.useState<boolean>(false);
    const [toggleChange, setToggleChange] = React.useState<boolean>(false);

    let strings = new LocalizedStrings({
        en:{
            expired:"Your session is expired. Please log in again.",
        },
        ua: {
            expired:"Ваша сесія закінчилася. Будь ласка, увійдіть знову.",
        }
    });

    const nav = useNavigate();

    useEffect(() => {
        const getTeam = async () => {
            let token = localStorage.getItem("access_token_cybersport");
            if (token !== null) {
                try {
                    const team = await GetTeam(token);

                    if (team.status === 404) {
                        setTeam(null)
                    }
                    else if (team === 401) {
                        const notify = () => toast.error(strings.expired);
                        notify();
                        setTimeout(() => nav('/'), 2000);
                    }
                    else{
                        setTeam(team as ITeam);
                    }
                }
                catch (e) {
                    const notify = () => toast.error(strings.expired);
                    notify();
                    setTimeout(() => nav('/'), 2000);
                }
            }
        }
        getTeam();
    }, [toggleChange])


    return (
        <div>
            <div className={modalCreateTeamOpen || modalUpdateTeamOpen ? "content-while-active-modal" : ''}>
                <NavMenu indexActive={0}/>
                <div className="team-page">
                    {team === undefined ? <Loader/> : team === null ? <TeamNotFound setModalCreateTeamOpen={setModalCreateTeamOpen}/> : <TeamComponent setModalUpdateTeamOpen={setModalUpdateTeamOpen} setToggleChange={setToggleChange} toggleChange={toggleChange} team={team}/>}
                </div>
            </div>

            {modalCreateTeamOpen && <ModalCreateTeam setToggleChange={setToggleChange} toggleChange={toggleChange} team={team} setTeam={setTeam} setModalCreateTeamOpen={setModalCreateTeamOpen}/>}
            {modalUpdateTeamOpen && <ModalUpdateTeam setToggleChange={setToggleChange} toggleChange={toggleChange} team={team} setTeam={setTeam} setModalUpdateTeamOpen={setModalUpdateTeamOpen}/>}
        </div>
    );
};

export default Team;