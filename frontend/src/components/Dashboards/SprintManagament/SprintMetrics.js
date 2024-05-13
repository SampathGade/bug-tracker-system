import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const SprintMetrics = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch projects on component mount
    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8080/project/getProjects', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: localStorage.getItem("userEmail"),
                        role: localStorage.getItem("userRole")
                    })
                });
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data.map(p => p.name)); // Assuming the project data includes names
                    setSelectedProject(data.length > 0 ? data[0].name : '');
                } else {
                    throw new Error('Failed to fetch projects');
                }
            } catch (error) {
                setError('Failed to load projects. Please try again.');
                console.error(error);
            }
            setLoading(false);
        };
        fetchProjects();
    }, []);

    // Fetch metrics whenever the selected project changes
    useEffect(() => {
        if (selectedProject) {
            const fetchMetrics = async () => {
                setLoading(true);
                try {
                    const response = await fetch('http://localhost:8080/api/metrics/sprint', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            project: selectedProject,
                            sprint: localStorage.getItem('currentSprint')
                        })
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setMetrics(data);
                    } else {
                        throw new Error('Failed to fetch metrics');
                    }
                } catch (error) {
                    setError('Failed to load metrics. Please try again.');
                    console.error(error);
                }
                setLoading(false);
            };
            fetchMetrics();
        }
    }, [selectedProject]);

    const handleProjectChange = (e) => {
        setSelectedProject(e.target.value);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!metrics) return <div>No data available.</div>;

    const pieData = {
        labels: ['To Do', 'In Progress', 'Done'],
        datasets: [{
            data: [metrics.statusCount['To Do'], metrics.statusCount['In Progress'], metrics.statusCount['Done']],
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
        }]
    };

    console.log(localStorage.getItem('currentSprint'))
    console.log(metrics)

    return (
        <div>
            <select onChange={handleProjectChange} value={selectedProject || ''}>
                {projects.map(project => (
                    <option key={project} value={project}>{project}</option>
                ))}
            </select>
            <Pie data={pieData} />
            <table>
                <thead>
                    <tr>
                        <th>Assignee</th>
                        <th>Total Bugs</th>
                        <th>Total Story Points</th>
                        <th>To Do Points</th>
                        <th>In Progress Points</th>
                        <th>Done Points</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(metrics.assigneeMetrics).map(([assignee, data]) => (
                        <tr key={assignee}>
                            <td>{assignee}</td>
                            <td>{data.totalBugs}</td>
                            <td>{data.totalStoryPoints}</td>
                            <td>{data['To Do'] || 0}</td>
                            <td>{data['In Progress'] || 0}</td>
                            <td>{data['Done'] || 0}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SprintMetrics;
