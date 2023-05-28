import React from 'react';
import {IPlayerShort} from "../interfaces/IPlayerShort";
import {Link} from "react-router-dom";
import LocalizedStrings from "react-localization";

const PlayerCard = (props:{
    player: IPlayerShort
}) => {
    const strings = new LocalizedStrings({
        en: {
            noData: 'No data',

        },
        ru: {
            noData: 'Немає даних',
        }
    })

    const lang = localStorage.getItem('language') || 'en';
    strings.setLanguage(lang);

    return (
        <Link to={`/player/${props.player.id}`} className={"player-card"}>
            <img className={"player-card-image"} src={props.player.avatar} alt=""/>
            <div className={"player-card-info"}>
                <p className="player-card-name">{props.player.firstName}</p>
                <p className="player-card-name">{props.player.lastName}</p>
                <div className={"circle-avg-heartbeat"}>{props.player.avgHeartBeatLastGame ? props.player.avgHeartBeatLastGame : strings.noData}</div>
            </div>
        </Link>
    );
};

export default PlayerCard;