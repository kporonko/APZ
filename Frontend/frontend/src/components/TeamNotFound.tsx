import React from 'react';

const TeamNotFound = (props:{
    setModalCreateTeamOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    return (
        <div className={"team-not-found-wrapper"}>
            <h1>Team not found</h1>
            <div
                className={"create-team-button"}
                onClick={() => props.setModalCreateTeamOpen(true)}
            >
                Create new team
            </div>
        </div>
    );
};

export default TeamNotFound;