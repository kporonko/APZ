import React from 'react';
import {IPlayerForTraining} from "../interfaces/IPlayerForTraining";
import player from "../pages/Player";
import LocalizedStrings from "react-localization";

const PlayerTrainingCard = (props:{
    player: IPlayerForTraining,
}) => {

    const strings = new LocalizedStrings({
        en: {
            channel: 'Channel Id',
            connect: 'Connect',
        },
        ru: {
            channel: 'Id каналу',
            connect: 'Підключити',
        }
    })
    const [player, setPlayer] = React.useState<IPlayerForTraining>(props.player)

    return (
        <div onClick={(e) => {
            e.stopPropagation()
            setPlayer({...player, isPresent: !player.isPresent})
        }} className={ player.isPresent ? "player-training-card-wrapper white-bc" : "player-training-card-wrapper gray-bc"}>
            <div>
                <img className="player-training-card-img" src={props.player.avatar} alt=""/>
            </div>
            <div className="player-training-card-info">
                <div>
                    {player.lastName}
                </div>
                <div>
                    {player.firstName}
                </div>
                {player.isPresent &&
                <div onClick={(e) => e.stopPropagation()}>
                    <div>
                        <label className="label" htmlFor="channel">{strings.channel}</label>
                    </div>
                    <input id={"channel"} name="channel" className={"channel-id-input"} type="text"/>
                    <div className="absolute-btn-connect-to-iot">
                        {strings.connect}
                    </div>
                </div>}
            </div>

        </div>
    );
};

export default PlayerTrainingCard;