import React from 'react';
import LocalizedStrings from "react-localization";

const TeamNotFound = (props:{
    setModalCreateTeamOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    let strings = new LocalizedStrings({
        en:{
            teamNotFound:"Team not found",
            createTeam:"Create Team",
        },
        ru: {
            teamNotFound:"Команда не знайдена",
            createTeam:"Створити Команду",
        }
    });

    const lang = localStorage.getItem('language') || 'en';
    strings.setLanguage(lang);

    return (
        <div className={"team-not-found-wrapper"}>
            <h1>{strings.teamNotFound}</h1>
            <div
                className={"create-team-button"}
                onClick={() => props.setModalCreateTeamOpen(true)}
            >
                {strings.createTeam}
            </div>
        </div>
    );
};

export default TeamNotFound;