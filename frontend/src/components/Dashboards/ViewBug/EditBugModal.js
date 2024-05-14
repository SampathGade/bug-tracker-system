import React, { useState, useEffect } from 'react';
import './BugComponent.css';
import CommentSection from './CommentSection';
import ImageUploader from './ImageUploader';
import ImageOverlay from './ImageOverlay';

const EditBugModal = ({ bug, onClose }) => {
    const [name, setName] = useState(bug.name);
    const [description, setDescription] = useState(bug.description);
    const [status, setStatus] = useState(bug.status);
    const [assignee, setAssignee] = useState(bug.assignee || '');
    const [assignees, setAssignees] = useState([]);
    const [expectedOutcome, setExpectedOutcome] = useState(bug.expectedOutcome || { text: '', images: [] });
    const [actualOutcome, setActualOutcome] = useState(bug.actualOutcome || { text: '', images: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [overlayImage, setOverlayImage] = useState(null);
    const userRole = localStorage.getItem("userRole");

    useEffect(() => {
        const fetchAssignees = async () => {
            try {
                const response = await fetch(`http://localhost:8080/users/getDevelopersByProject`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body:  bug.project
                });
                if (response.ok) {
                    const assigneesData = await response.json();
                    setAssignees(assigneesData);
                    if (!assignee) {
                        setAssignee(assigneesData.length > 0 ? assigneesData[0] : '');
                    }
                } else {
                    console.error('Failed to fetch assignees');
                }
            } catch (error) {
                console.error('Error fetching assignees:', error);
            }
        };

        fetchAssignees();
    }, [bug.project, assignee]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const updateData = {
            id: bug.id,
            name,
            description,
            status,
            assignee,
            expectedOutcome,
            actualOutcome
        };

        try {
            const response = await fetch(`http://localhost:8080/bug/updateBug`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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

    const handleDeleteBug = async () => {
        const response = await fetch(`http://localhost:8080/bug/deleteBug/${bug.id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Bug deleted successfully');
            onClose();
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

    const handleDeleteImage = (type, index) => {
        const updateOutcome = (outcome) => {
            const newImages = [...outcome.images];
            newImages.splice(index, 1);
            return { ...outcome, images: newImages };
        };

        if (type === 'expected') {
            setExpectedOutcome(updateOutcome(expectedOutcome));
        } else if (type === 'actual') {
            setActualOutcome(updateOutcome(actualOutcome));
        }
    };

    const handleImageUpload = (type, urls) => {
        const updateOutcome = (outcome) => {
            return { ...outcome, images: [...outcome.images, ...urls] };
        };

        if (type === 'expected') {
            setExpectedOutcome(updateOutcome(expectedOutcome));
        } else if (type === 'actual') {
            setActualOutcome(updateOutcome(actualOutcome));
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
                    <label>
                        Expected Outcome:
                        <textarea value={expectedOutcome.text} onChange={(e) => setExpectedOutcome({ ...expectedOutcome, text: e.target.value })} disabled={isLoading} />
                        {expectedOutcome.images.map((img, index) => (
                            <div key={index} className="image-container">
                                <img src={img} alt="Expected outcome" style={{ width: '100px', height: 'auto', margin: '5px' }} onClick={() => setOverlayImage(img)} />
                                <button type="button" onClick={() => handleDeleteImage('expected', index)}>Delete</button>
                            </div>
                        ))}
                        <ImageUploader onUpload={(urls) => handleImageUpload('expected', urls)} disabled={isLoading} />
                    </label>
                    <label>
                        Actual Outcome:
                        <textarea value={actualOutcome.text} onChange={(e) => setActualOutcome({ ...actualOutcome, text: e.target.value })} disabled={isLoading} />
                        {actualOutcome.images.map((img, index) => (
                            <div key={index} className="image-container">
                                <img src={img} alt="Actual outcome" style={{ width: '100px', height: 'auto', margin: '5px' }} onClick={() => setOverlayImage(img)} />
                                <button type="button" onClick={() => handleDeleteImage('actual', index)}>Delete</button>
                            </div>
                        ))}
                        <ImageUploader onUpload={(urls) => handleImageUpload('actual', urls)} disabled={isLoading} />
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
            {overlayImage && <ImageOverlay image={overlayImage} onClose={() => setOverlayImage(null)} />}
        </div>
    );
};

export default EditBugModal;
