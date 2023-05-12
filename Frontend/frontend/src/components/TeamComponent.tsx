import React from 'react';
import {ITeam} from "../interfaces/ITeam";

const TeamComponent = (props:{team: ITeam}) => {
    return (
        <div className={"team-wrapper"}>
            <div className={"header-my-team"}>
                My Team
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
                    <div className="edit-team-button">
                        Edit team
                    </div>
                    <div className="delete-team-button">
                        Delete team
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamComponent;