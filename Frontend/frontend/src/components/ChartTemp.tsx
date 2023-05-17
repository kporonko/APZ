import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {ITempDto} from "../interfaces/ITempDto";
import {IGameFull} from "../interfaces/IGameFull";
import {DateTime} from "luxon";

const ChartTemp = (props:{
    data: ITempDto[],
    game: IGameFull
}) => {

    let data = props.data;
    const userLocale = navigator.language;

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    let formattedData = data.map((item) => ({
        ...item,
        created_at: new Date(DateTime.fromISO(item.created_at, { zone: 'UTC', locale: userLocale }).setZone(timeZone).toISO()!).toLocaleString()
    }));

    formattedData.filter((item) => {
        return new Date(item.created_at!) > new Date(props.game.gameStartDate) && new Date(item.created_at!) < new Date(props.game.gameEndDate);
    })

    return (
        <div className={"chart-wrapper"}>
            <LineChart
                width={1400}
                height={600}
                data={formattedData}
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
                <XAxis dataKey="created_at" />
                <YAxis type={"number"}/>
                <YAxis type={"number"}/>
                <Tooltip />
                <Legend name={"ffff"}/>
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="field1" stroke="#8884d8" />
            </LineChart>
        </div>
    );
};

export default ChartTemp;