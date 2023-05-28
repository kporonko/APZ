import React from 'react';
import {IPlayerForTraining} from "../interfaces/IPlayerForTraining";
import player from "../pages/Player";
import LocalizedStrings from "react-localization";
import {AddGame, SendGameId} from "../data/fetch";
import {toast, ToastContainer} from "react-toastify";

const PlayerTrainingCard = (props:{
    player: IPlayerForTraining,
    setPlayers: React.Dispatch<React.SetStateAction<IPlayerForTraining[]>>,
}) => {
    const [isConnected, setIsConnected] = React.useState<boolean>(false)
    const strings = new LocalizedStrings({
        en: {
            channel: 'Channel Id',
            connect: 'Connect',
            connected: 'Ok',
            success: 'Success',
            error: 'Error',
            alreadyConnected: 'Already connected',
        },
        ru: {
            channel: 'Id каналу',
            connect: 'Підключити',
            connected: 'Oк',
            success: 'Успішно',
            error: 'Помилка',
            alreadyConnected: 'Вже підключено',
        }
    })

    const lang = localStorage.getItem('language') || 'en';
    strings.setLanguage(lang);

    const [player, setPlayer] = React.useState<IPlayerForTraining>(props.player)

    const handleConnectToIoT = async () => {
        if (isConnected){
            const notify = () => toast.error(strings.alreadyConnected);
            notify();
            return;
        }
        const token = localStorage.getItem('access_token_cybersport')
        if (token){
            const res = await AddGame(token, props.player.id, player.channelId);
            const connectToIoT = await SendGameId(token, res);
            if (connectToIoT === 200){
                setIsConnected(true)
                const notify = () => toast.success(strings.success);
                notify();
                props.setPlayers(prevState => prevState.map((currPlayer) => {
                    if (currPlayer.id === props.player.id){
                        return {...currPlayer, isPresent: true, isConnected: true, gameId: res, channelId: player.channelId}
                    }
                    return currPlayer
                }))
            }
            else{
                const notify = () => toast.error(strings.error);
                notify();
            }
            setIsConnected(true);
        }
    }

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
                    <input value={props.player.channelId} onChange={(e) => {
                        setPlayer({...player, channelId: e.target.value})
                    }} id={"channel"} name="channel" className={"channel-id-input"} type="text"/>
                    <div onClick={handleConnectToIoT} className={isConnected ? "green-bc absolute-btn-connect-to-iot" : "absolute-btn-connect-to-iot"}>
                        {isConnected ? strings.connected : strings.connect}
                    </div>
                </div>}
            </div>
            <ToastContainer/>
        </div>
    );
};

export default PlayerTrainingCard;