import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', value: 2000 },
    { name: 'Feb', value: 4000 },
    { name: 'Mar', value: 3000 },
    { name: 'Apr', value: 5000 },
    { name: 'May', value: 7000 },
    { name: 'Jun', value: 6000 },
    { name: 'Jul', value: 8200 },
    { name: 'Aug', value: 3500 },
    { name: 'Sep', value: 6400 },
    { name: 'Oct', value: 7100 },
    { name: 'Nov', value: 6300 },
    { name: 'Dec', value: 6900 },
];

const FeesChart = () => (
    <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#fbc02d" strokeWidth={3} />
        </LineChart>
    </ResponsiveContainer>
);

export default FeesChart;
