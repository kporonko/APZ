import React from 'react';
import {IPlayerShort} from "../interfaces/IPlayerShort";

const PlayerCard = (props:{
    player: IPlayerShort
}) => {
    return (
        <div>
            <img src={props.player.Avatar} alt=""/>
            {props.player.FirstName}
            {props.player.LastName}
            {props.player.AvgHeartBeatLastGame}
        </div>
    );
};

export default PlayerCard;