import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { RadialBarChart, RadialBar, Legend, Tooltip, LabelList } from 'recharts';


function PiePool(props) {
    let data = [
        {'name':'CELO-mcUSD','value': 12, 'apr':0.26, 'fill': '#8884d8' },
        {'name':'mcUSD-mcEUR', 'value': 25, 'apr':0.13, 'fill': '#8884d8'},
        {'name':'CELO-mcEUR', 'apr':0.13, 'value': 25, 'fill': '#8884d8'},
        {'name': 'Group D', 'apr':0.13, 'value': 30, 'fill': '#8884d8'},
    ];

    return (
        <ResponsiveContainer width="100%" height={200}>
        <RadialBarChart
            width={30}
            height={250}
            innerRadius="10%"
            outerRadius="80%"
            data={data}
            startAngle={180}
            endAngle={0}
        >
            <RadialBar label={{ fill: '#ffffff', position: 'end',  }}  clockWise={true} dataKey='value' />
            <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
            <Tooltip />
        </RadialBarChart>
        </ResponsiveContainer>
    );
}
export default PiePool;