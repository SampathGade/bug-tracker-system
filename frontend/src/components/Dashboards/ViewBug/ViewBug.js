import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import CreateBug from './CreateBug';
import styles from './ViewBugs.module.css';

Modal.setAppElement('#root');

const ViewBugs = () => {
    const [bugs, setBugs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editableBug, setEditableBug] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const data = [
            { id: 1, bugName: 'Bug 1', bugType: 'Type 1', currentStatus: 'Open', assignee: 'User A', expectedOutput: '', currentOutput: '' },
            { id: 2, bugName: 'Bug 2', bugType: 'Type 2', currentStatus: 'Closed', assignee: 'User B', expectedOutput: '', currentOutput: '' },
            { id: 3, bugName: 'Bug 3', bugType: 'Type 3', currentStatus: 'Open', assignee: 'User C', expectedOutput: '', currentOutput: '' },
        ];
        setBugs(data);
    };

    const handleCreateOrEditBug = (bugData, id) => {
        if (id) {
            setBugs(bugs.map(bug => bug.id === id ? { ...bug, ...bugData } : bug));
        } else {
            setBugs([...bugs, { ...bugData, id: bugs.length + 1 }]);
        }
        setIsModalOpen(false);
    };

    const openEditModal = (bug) => {
        setEditableBug(bug);
        setIsModalOpen(true);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>View Bugs</h2>
            <div className={styles.buttonContainer}>
                <button onClick={() => { setEditableBug(null); setIsModalOpen(true); }} className={styles.button}>Create New Bug</button>
            </div>
            <div className={styles.bugsList}>
                {bugs.map((bug, index) => (
                    <div key={index} className={styles.bugCard}>
                        <p><strong>Bug Name:</strong> {bug.bugName}</p>
                        <p><strong>Bug Type:</strong> {bug.bugType}</p>
                        <p><strong>Current Status:</strong> {bug.currentStatus}</p>
                        <p><strong>Assignee:</strong> {bug.assignee}</p>
                        <button onClick={() => openEditModal(bug)} className={styles.button}>Edit</button>
                    </div>
                ))}
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <CreateBug onBugCreated={handleCreateOrEditBug} closeModal={() => setIsModalOpen(false)} bug={editableBug} />
            </Modal>
        </div>
      );
      
};

export default ViewBugs;
