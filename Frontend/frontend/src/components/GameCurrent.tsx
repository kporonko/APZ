import React from 'react';
import {useParams} from "react-router";
import {IPlayerForTraining} from "../interfaces/IPlayerForTraining";
import { useLocation } from "react-router-dom";

const GameCurrent = () => {

    const location = useLocation();
    let players: IPlayerForTraining[] = location.state.players;
    console.log("players");
    console.log(players);
    return (
        <div>
            
        </div>
    );
};

export default GameCurrent;