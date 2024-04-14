import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import CreateProject from '../CreateProject/CreateProject';
import styles from './ViewProjects.module.css';

Modal.setAppElement('#root');

const ViewProjects = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editableProject, setEditableProject] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        // Assuming this data is fetched from an API
        const data = [
            { id: 1, projectName: 'Project A', manager: 'Manager A', details: 'Details A' },
            { id: 2, projectName: 'Project B', manager: 'Manager B', details: 'Details B' },
            { id: 3, projectName: 'Project C', manager: 'Manager C', details: 'Details C' },
        ];
        setProjects(data);
    };

    const handleCreateOrEditProject = (projectData, id) => {
        if (id) {
            setProjects(prevProjects =>
                prevProjects.map(project =>
                    project.id === id ? { ...project, ...projectData } : project
                )
            );
        } else {
            setProjects(prevProjects => [
                ...prevProjects,
                { ...projectData, id: prevProjects.length + 1 },
            ]);
        }
        setIsModalOpen(false);
    };

    const openModalForEdit = (project) => {
        setEditableProject(project);
        setIsModalOpen(true);
    };

    const openModalForNew = () => {
        setEditableProject(null);
        setIsModalOpen(true);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>View Projects</h2>
            <button onClick={openModalForNew} className={styles.addButton}>Add Project</button>
            <div className={styles.projectsList}>
                {projects.map((project, index) => (
                    <div key={index} className={styles.projectCard}>
                        <p><strong>Project Name:</strong> {project.projectName}</p>
                        <p><strong>Manager:</strong> {project.manager}</p>
                        <button onClick={() => openModalForEdit(project)} className={styles.editButton}>Edit</button>
                    </div>
                ))}
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                <CreateProject closeModal={() => setIsModalOpen(false)} project={editableProject} onProjectUpdated={handleCreateOrEditProject} />
            </Modal>
        </div>
    );
};

export default ViewProjects;
