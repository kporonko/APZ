import React from 'react';
import {IGameDataCurrent} from "../interfaces/IGameDataCurrent";
import {DateTime} from "luxon";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

const ChartHeartBeatCurrent = (props:{
    gameData: IGameDataCurrent
}) => {
    console.log(props.gameData);
    let heartBeats = props.gameData.heartBeats;
    const userLocale = navigator.language;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    let formattedData = heartBeats.map((item) => ({
        ...item,
        heartBeatDate: new Date(DateTime.fromISO(item.heartBeatDate, { zone: 'Europe/Kiev', locale: userLocale }).setZone(timeZone).toISO()!).toLocaleString()
    }));

    return (
        <div className={"chart-wrapper-current"}>
            <LineChart
                width={450}
                height={400}
                data={formattedData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
                <XAxis dataKey="heartBeatDate" />
                <YAxis type={"number"}/>
                <YAxis type={"number"}/>
                <Tooltip />
                <Legend name={"ffff"}/>
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
        </div>
    );
};

export default ChartHeartBeatCurrent;