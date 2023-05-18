import React from 'react';
import {IPlayer} from "../interfaces/IPlayer";
import {IPlayerShort} from "../interfaces/IPlayerShort";
import {IPlayerForTraining} from "../interfaces/IPlayerForTraining";
import PlayerTrainingCard from "../components/PlayerTrainingCard";

const ModalCreateTrainingContent = (props: {
    players: IPlayerShort[],
    setPlayers: React.Dispatch<React.SetStateAction<IPlayerShort[]>>
}) => {

    const [players, setPlayers] = React.useState<IPlayerForTraining[]>(props.players as IPlayerForTraining[])

    return (
        <div>
            <div>
                {players.map((player) => {
                    return (
                        <div key={player.id}>
                            <PlayerTrainingCard player={player} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ModalCreateTrainingContent;