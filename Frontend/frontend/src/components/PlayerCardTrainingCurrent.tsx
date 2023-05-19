import React from 'react';
import {IPlayerForTraining} from "../interfaces/IPlayerForTraining";
import {Link} from "react-router-dom";
import LocalizedStrings from "react-localization";
import {IGameDataCurrent} from "../interfaces/IGameDataCurrent";

const PlayerCardTrainingCurrent = (props:{
    player:IPlayerForTraining,
    game: IGameDataCurrent | undefined
}) => {

    return (
        <div className={props.game?.isLastHeartBeatOk === undefined ? "player-card-training-current" : !props.game?.isLastHeartBeatOk ? "red-bc player-card-training-current" : "green-bc player-card-training-current"}>
            <img className={"player-card-image-training"} src={props.player.avatar} alt=""/>
            <div className={"player-card-info"}>
                <p className="player-card-name">{props.player.firstName}</p>
                <p className="player-card-name">{props.player.lastName}</p>
            </div>
        </div>
    );
};

export default PlayerCardTrainingCurrent;