import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Modal from 'react-modal';
import { saveAs } from 'file-saver';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const SprintMetrics = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

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
                    setProjects(data.map(p => p.name));
                    setSelectedProject(data[0]?.name || '');
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

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSprintClose = async () => {
        closeModal();
        try {
            const response = await fetch('http://localhost:8080/api/sprint/close');
            if (response.ok) {
                const newSprint = await response.json();
                localStorage.setItem('currentSprint', newSprint.sprintId);
                window.location.reload();
            } else {
                throw new Error('Failed to close the sprint');
            }
        } catch (error) {
            setError('Failed to close the sprint. Please try again.');
            console.error(error);
        }
    };

    const downloadCSV = () => {
        const headers = ["Assignee", "Total Bugs", "Total Story Points", "To Do Points", "In Progress Points", "Done Points"];
        const csvRows = [
            headers.join(',')
        ];
    
        // Iterate over the keys of the assigneeMetrics object
        for (const [assignee, data] of Object.entries(metrics.assigneeMetrics)) {
            const row = [
                assignee,
                data.totalBugs,
                data.totalStoryPoints,
                data['To Do'] || 0,
                data['In Progress'] || 0,
                data['Done'] || 0
            ];
            csvRows.push(row.join(','));
        }
    
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'SprintMetrics.csv');
    };
    
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!metrics) return <div>No data available.</div>;
    
    // Preparing pieData for the chart
    const pieData = {
        labels: ['To Do', 'In Progress', 'Done'],
        datasets: [{
            data: [metrics.statusCount['To Do'], metrics.statusCount['In Progress'], metrics.statusCount['Done']],
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
        }]
    };
    
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <select onChange={handleProjectChange} value={selectedProject || ''}>
                    {projects.map(project => (
                        <option key={project} value={project}>{project}</option>
                    ))}
                </select>
                <button onClick={() => setModalIsOpen(true)}>Close Sprint</button>
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Close Sprint Confirmation">
                <h2>Confirm Sprint Closure</h2>
                <p>Do you really want to close the current sprint?</p>
                <button onClick={handleSprintClose}>Yes</button>
                <button onClick={closeModal}>No</button>
            </Modal>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '300px', height: '300px' }}> {/* Adjust width and height here */}
                    <Pie data={pieData} />
                </div>
                <div>
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
                    <button onClick={downloadCSV} style={{ marginTop: '10px' }}>Download CSV</button>
                </div>
            </div>
        </div>
    );
    
}

export default SprintMetrics;


