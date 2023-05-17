import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {ITempDto} from "../interfaces/ITempDto";
import {IGameFull} from "../interfaces/IGameFull";

const ChartTemp = (props:{
    data: ITempDto[],
    game: IGameFull
}) => {

    let data = props.data;
    const userLocale = navigator.language;
    const options = {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    const formattedData = data.map((item) => ({
        ...item,
        created_at: new Date(item.created_at).toLocaleString(userLocale, options)
    }));

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