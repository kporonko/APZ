import React, {useEffect} from 'react';
import {IGameFull} from "../interfaces/IGameFull";
import {IChartData} from "../interfaces/IChartData";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {DateTime} from "luxon";

const ChartHeartBeat = (props:{
    game: IGameFull
}) => {

    let heartBeats = props.game.heartBeats;
    const userLocale = navigator.language;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    let formattedData = heartBeats.map((item) => ({
        ...item,
        heartBeatDate: new Date(DateTime.fromISO(item.heartBeatDate, { zone: 'Europe/Kiev', locale: userLocale }).setZone(timeZone).toISO()!).toLocaleString()
    }));

    return (
        <div className={"chart-wrapper"}>
            <LineChart
                width={1400}
                height={600}
                data={formattedData}
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
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

export default ChartHeartBeat;