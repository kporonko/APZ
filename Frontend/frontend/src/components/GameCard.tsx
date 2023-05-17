import React from 'react';
import {IGame} from "../interfaces/IGame";
import {IGameShort} from "../interfaces/IGameShort";
import {Link} from "react-router-dom";
import LocalizedStrings from "react-localization";

const GameCard = (props:{
    game: IGameShort,
}) => {
    const strings = new LocalizedStrings({
        en:{
            game:"Game",
            from:"from",
            to:"to",
        },
        ru: {
            game:"Гра",
            from:"з",
            to:"до",
        }

    })
    return (
        <Link className="game-card-wrapper" to={`/game/${props.game.id}`}>
            <div>
                <img className="game-card-image" src={require("../assets/istockphoto-1324673294-612x612.jpg")} alt=""/>
            </div>
            <div className={"game-card-info-wrapper"}>
                <div className="game-card-id">
                    {strings.game}№{props.game.id}
                </div>
                <div className="game-card-date">
                    {strings.from} {new Date(props.game.gameStartDate).toLocaleDateString()}
                </div>
                <div className="game-card-date">
                    {strings.to} {props.game.gameEndDate && new Date(props.game.gameEndDate).toLocaleDateString()}
                </div>
                <div className="heartbeat-circle">
                    {props.game.avgHeartBeat}
                </div>
            </div>
        </Link>
    );
};

export default GameCard;