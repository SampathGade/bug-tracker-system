import React, { useState, useEffect, useRef } from 'react';
import './Project.css';

const BugDetailsPopup = ({ bug, onClose, onBugUpdated, currentUser }) => {
    const [details, setDetails] = useState(bug);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(bug.comments || []);
    const [assignees, setAssignees] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/users/getDevelopers', { method: 'GET' })
        .then(response => response.json())
        .then(setAssignees)
        .catch(console.error);
    }, []);

    const handleCommentSubmit = () => {
        const updatedComments = [...comments, { text: comment, author: currentUser.email }];
        setComments(updatedComments);
        setComment('');
    };

    const handleSaveChanges = async () => {
        const payload = {
            ...details,
            comments: comments
        };

        const response = await fetch(`http://localhost:8080/bug/updateBug`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            onBugUpdated();
            onClose();
        }
    };

    return (
        <div className="overlay" onClick={onClose}>
            <div className="bug-detail-popup" onClick={e => e.stopPropagation()}>
                <h2>Edit Bug</h2>
                <p><strong>Project:</strong> {details.projectName}</p>
                <p><strong>Bug Type:</strong> {details.bugType}</p>
                <p><strong>Project Manager:</strong> {details.projectManager}</p>
                <select value={details.assignee} onChange={(e) => setDetails({...details, assignee: e.target.value})} disabled={!(currentUser.role === 'admin' || currentUser.role === 'project manager')}>
                    {assignees.map(dev => (
                        <option key={dev.email} value={dev.email}>{dev.email}</option>
                    ))}
                </select>
                <div>
                    {comments.map((c, index) => (
                        <p key={index}><strong>{c.author}:</strong> {c.text}</p>
                    ))}
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..."/>
                    <button onClick={handleCommentSubmit}>Add Comment</button>
                </div>
                <button onClick={handleSaveChanges}>Save Changes</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default BugDetailsPopup;
