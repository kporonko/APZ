import React, {useEffect} from 'react';
import NavMenu from "../components/NavMenu";
import {ITeam} from "../interfaces/ITeam";
import {GetTeam} from "../data/fetch";
import Loader from "../components/Loader";
import TeamNotFound from "../components/TeamNotFound";
import TeamComponent from "../components/TeamComponent";
import ModalCreateTeam from "../modals/ModalCreateTeam";

const Team = () => {

    const [team, setTeam] = React.useState<ITeam|null|undefined>(undefined);

    const [modalCreateTeamOpen, setModalCreateTeamOpen] = React.useState<boolean>(false);

    useEffect(() => {
        const getTeam = async () => {
            let token = localStorage.getItem("access_token_cybersport");
            if (token !== null) {
                const team = await GetTeam(token);
                if (team.status === 404) {
                    setTeam(null)
                }
                else{
                    setTeam(team as ITeam);
                }
                console.log(team);
            }
        }
        getTeam();
    }, [])

    return (
        <div>
            <div className={modalCreateTeamOpen ? "content-while-active-modal" : ''}>
                <NavMenu indexActive={0}/>
                <div className="team-page">
                    {team === undefined ? <Loader/> : team === null ? <TeamNotFound setModalCreateTeamOpen={setModalCreateTeamOpen}/> : <TeamComponent team={team}/>}
                </div>
            </div>

            {modalCreateTeamOpen && <ModalCreateTeam team={team} setTeam={setTeam} setModalCreateTeamOpen={setModalCreateTeamOpen}/>}
        </div>
    );
};

export default Team;