import React, { useState } from 'react';
import styles from './OnboardPerson.module.css'; // Import the styles

const OnboardPerson = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [requests, setRequests] = useState([
        { email: "example1@example.com", role: "Developer", approved: true },
        { email: "example2@example.com", role: "Product Manager", approved: false },
        { email: "example3@example.com", role: "QA Analyst", approved: false },
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRequest = { email, role, approved: false };
        setRequests([...requests, newRequest]);
        setEmail('');
        setRole('');
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginForm}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.title}>Onboard a New Person</div>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </label>
                    <label>
                        Role:
                        <input
                            type="text"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </label>
                    <button type="submit" className={styles.button}>Submit</button>
                </form>

                <h2 className={styles.title}>Onboarding Requests</h2>
                <ul className={styles.requestList}>
                    {requests.map((request, index) => (
                        <li key={index} className={styles.requestItem}>
                            Email: {request.email}, Role: {request.role}, Approved: {request.approved ? 'Yes' : 'No'}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OnboardPerson;
