import React, { useState, useEffect } from 'react';
import styles from './CreateBug.module.css';

const CreateBug = ({ onBugCreated, closeModal, bug }) => {
    const [bugName, setBugName] = useState('');
    const [bugType, setBugType] = useState('');
    const [expectedOutput, setExpectedOutput] = useState('');
    const [currentOutput, setCurrentOutput] = useState('');
    const [assignee, setAssignee] = useState('');

    useEffect(() => {
        if (bug) {
            setBugName(bug.bugName);
            setBugType(bug.bugType);
            setExpectedOutput(bug.expectedOutput);
            setCurrentOutput(bug.currentOutput);
            setAssignee(bug.assignee);
        }
    }, [bug]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedBug = { bugName, bugType, expectedOutput, currentOutput, assignee, currentStatus: 'Open' };
        onBugCreated(updatedBug, bug ? bug.id : null); // Pass bug id if editing
        closeModal();
    };

    return (
        <div className={styles.container}>
            <button onClick={closeModal} className={styles.closeButton}>&times;</button>
            <h2>{bug ? "Edit Bug" : "Create Bug"}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>Bug Name:</label>
                <input type="text" value={bugName} onChange={(e) => setBugName(e.target.value)} required className={styles.input} />
                <label className={styles.label}>Bug Type:</label>
                <input type="text" value={bugType} onChange={(e) => setBugType(e.target.value)} required className={styles.input} />
                <label className={styles.label}>Expected Output:</label>
                <input type="text" value={expectedOutput} onChange={(e) => setExpectedOutput(e.target.value)} className={styles.input} />
                <label className={styles.label}>Current Output:</label>
                <input type="text" value={currentOutput} onChange={(e) => setCurrentOutput(e.target.value)} className={styles.input} />
                <label className={styles.label}>Assignee:</label>
                <input type="text" value={assignee} onChange={(e) => setAssignee(e.target.value)} className={styles.input} />
                <button type="submit" className={styles.button}>{bug ? "Update Bug" : "Create Bug"}</button>
            </form>
        </div>
    );
};

export default CreateBug;
