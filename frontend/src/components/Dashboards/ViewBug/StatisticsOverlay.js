import React from 'react';
import { Pie } from 'react-chartjs-2';

const StatisticsOverlay = ({ onClose, data }) => {
    const { bugs } = data;

    // Data preparation for the table and pie chart
    const assigneeStats = bugs.reduce((acc, bug) => {
        acc[bug.assignee] = acc[bug.assignee] || { total: 0, done: 0, inProgress: 0 };
        acc[bug.assignee].total++;
        if (bug.status === 'Done') acc[bug.assignee].done++;
        if (bug.status === 'In Progress') acc[bug.assignee].inProgress++;
        return acc;
    }, {});

    const pieData = {
        labels: ['To Do', 'In Progress', 'Done'],
        datasets: [
            {
                data: [bugs.filter(b => b.status === 'To Do').length, bugs.filter(b => b.status === 'In Progress').length, bugs.filter(b => b.status === 'Done').length],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
        ]
    };

    return (
        <div className="overlay" onClick={onClose}>
            <div className="overlay-content" onClick={e => e.stopPropagation()}>
                <table>
                    <thead>
                        <tr>
                            <th>Assignee</th>
                            <th>Total Bugs</th>
                            <th>Done</th>
                            <th>In Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(assigneeStats).map(assignee => (
                            <tr key={assignee}>
                                <td>{assignee}</td>
                                <td>{assigneeStats[assignee].total}</td>
                                <td>{assigneeStats[assignee].done}</td>
                                <td>{assigneeStats[assignee].inProgress}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pie data={pieData} />
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default StatisticsOverlay;
