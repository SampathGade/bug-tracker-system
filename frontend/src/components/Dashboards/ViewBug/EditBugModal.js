import React, { useState, useEffect } from 'react';
import './BugComponent.css';

const EditBugModal = ({ bug, onClose, projects }) => {
    const [name, setName] = useState(bug.name);
    const [description, setDescription] = useState(bug.description);
    const [status, setStatus] = useState(bug.status);
    // const [priority, setPriority] = useState(bug.priority);
    const [assignee, setAssignee] = useState(bug.assignee);
    const [assignees, setAssignees] = useState([]);
    // const [comments, setComments] = useState(bug.comments || "");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAssignees = async () => {
            try {
                const response = await fetch(`http://localhost:8080/users/getDevelopersByProject`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: bug.project 
                });
                if (response.ok) {
                    const assigneesData = await response.json();
                    setAssignees(assigneesData);
                } else {
                    console.error('Failed to fetch assignees');
                }
            } catch (error) {
                console.error('Error fetching assignees:', error);
            }
        };

        fetchAssignees();
    }, [bug.project]); // Only re-run when bug.project changes

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const updateData = {
            id: bug.id,
            name: name,
            description: description,
            status: status,
            // priority: priority,
            assignee: assignee,
            // comments: comments
        };

        try {
            const response = await fetch('http://localhost:8080/bug/updateBug', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                console.log('Bug updated successfully');
                onClose();
            } else {
                const errorData = await response.json();
                console.error('Error details:', errorData);
                alert(`Failed to update the bug: ${errorData.message || 'Please try again'}.`);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="overlay">
            <div className="overlay-content" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className="edit-bug-form">
                    <div className="left-section">
                        <h2>Edit Bug</h2>
                        <label>
                            Title:
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
                        </label>
                        <label>
                            Description:
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required disabled={isLoading} />
                        </label>
                        {/* <label>
                            Comments:
                            <textarea value={comments} onChange={(e) => setComments(e.target.value)} disabled={isLoading} />
                        </label> */}
                    </div>
                    <div className="right-section">
                        <label>
                            Project:
                            <input type="text" value={bug.project} disabled />
                        </label>
                        <label>
                            Status:
                            <select value={status} onChange={(e) => setStatus(e.target.value)} disabled={isLoading}>
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </label>
                        {/* <label>
                            Priority:
                            <select value={priority} onChange={(e) => setPriority(e.target.value)} disabled={isLoading}>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </label> */}
                        <label>
                            Assignee:
                            <select value={assignee} onChange={(e) => setAssignee(e.target.value)} disabled={isLoading}>
                                {assignees.map(assignee => (
                                    <option key={assignee} value={assignee}>{assignee}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className='form-actions'>
                        <button type="submit" disabled={isLoading}>{isLoading ? 'Updating...' : 'Update Bug'}</button>
                        <button type="button" onClick={onClose} disabled={isLoading}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBugModal;
