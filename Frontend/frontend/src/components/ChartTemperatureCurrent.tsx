import React from 'react';
import {ITempDto} from "../interfaces/ITempDto";
import {DateTime} from "luxon";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

const ChartTemperatureCurrent = (props:{
    tempData: ITempDto[]
}) => {

    const userLocale = navigator.language;

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    let formattedData = props.tempData.map((item) => ({
        ...item,
        created_at: new Date(DateTime.fromISO(item.created_at, { zone: 'UTC', locale: userLocale }).setZone(timeZone).toISO()!).toLocaleString()
    }));

    // formattedData.filter((item) => {
    //     return new Date(item.created_at!) > new Date(props.game.gameStartDate) && new Date(item.created_at!) < new Date(props.game.gameEndDate);
    // })

    return (
        <div className={"chart-wrapper-current"}>
            <LineChart
                width={450}
                height={400}
                data={formattedData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
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

export default ChartTemperatureCurrent;