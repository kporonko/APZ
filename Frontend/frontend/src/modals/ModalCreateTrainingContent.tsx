import React from 'react';
import {IPlayer} from "../interfaces/IPlayer";
import {IPlayerShort} from "../interfaces/IPlayerShort";
import {IPlayerForTraining} from "../interfaces/IPlayerForTraining";
import PlayerTrainingCard from "../components/PlayerTrainingCard";

const ModalCreateTrainingContent = (props: {
    players: IPlayerForTraining[],
    setPlayers: React.Dispatch<React.SetStateAction<IPlayerForTraining[]>>,
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
}) => {

    return (
        <div>
            <div>
                {props.players.map((player) => {
                    return (
                        <div key={player.id}>
                            <PlayerTrainingCard setPlayers={props.setPlayers} player={player} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ModalCreateTrainingContent;