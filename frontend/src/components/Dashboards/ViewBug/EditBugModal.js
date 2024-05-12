import React, { useState, useEffect } from 'react';
import './BugComponent.css';
import CommentSection from './CommentSection';  // Ensure this is the path to your CommentSection component

const EditBugModal = ({ bug, onClose }) => {
    const [name, setName] = useState(bug.name);
    const [description, setDescription] = useState(bug.description);
    const [status, setStatus] = useState(bug.status);
    const [assignee, setAssignee] = useState(bug.assignee);
    const [assignees, setAssignees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const userRole = localStorage.getItem("userRole");

    useEffect(() => {
        const fetchAssignees = async () => {
            try {
                const response = await fetch(`http://localhost:8080/users/getDevelopersByProject`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ project: bug.project })
                });
                if (response.ok) {
                    const assigneesData = await response.json();
                    setAssignees(assigneesData);
                    setAssignee(assigneesData.length > 0 ? assigneesData[0] : '');
                } else {
                    console.error('Failed to fetch assignees');
                }
            } catch (error) {
                console.error('Error fetching assignees:', error);
            }
        };

        fetchAssignees();
    }, [bug.project]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const updateData = {
            id: bug.id,
            name,
            description,
            status,
            assignee,
        };

        try {
            const response = await fetch(`http://localhost:8080/bug/updateBug`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                console.log('Bug updated successfully');
                onClose(); // Optionally refresh the list or parent component
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

    const handleDeleteBug = async () => {
        const response = await fetch(`http://localhost:8080/bug/deleteBug/${bug.id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Bug deleted successfully');
            onClose(); // Close the modal and refresh the list
        } else {
            console.error('Failed to delete bug');
            alert('Failed to delete the bug. Please try again.');
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="overlay" onClick={handleOverlayClick}>
            <div className="overlay-content" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className="edit-bug-form">
                    <h2>Edit Bug</h2>
                    <label>
                        Title:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
                    </label>
                    <label>
                        Description:
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required disabled={isLoading} />
                    </label>
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
                    <label>
                        Assignee:
                        <select value={assignee} onChange={(e) => setAssignee(e.target.value)} disabled={isLoading}>
                            {assignees.map(assignee => (
                                <option key={assignee} value={assignee}>{assignee}</option>
                            ))}
                        </select>
                    </label>
                    <div className='form-actions'>
                        <button type="submit" disabled={isLoading}>{isLoading ? 'Updating...' : 'Update Bug'}</button>
                        <button type="button" onClick={onClose} disabled={isLoading}>Cancel</button>
                        {(userRole === 'projectManager' || userRole === 'admin') && (
                            <button type="button" onClick={handleDeleteBug} disabled={isLoading}>Delete Bug</button>
                        )}
                    </div>
                </form>
                <CommentSection bugId={bug.id} comments={bug.comments || []} />
            </div>
        </div>
    );
};

export default EditBugModal;
