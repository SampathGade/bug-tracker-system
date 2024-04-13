// OnboardPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const OnboardPage = () => {
    return (
        <div>
            <h2>Onboard Page</h2>
            <Link to="/reviewRequests">
                <button>Review Requests</button>
            </Link>
            <Link to="/onboardNewPerson">
                <button>Onboard a New Person</button>
            </Link>
        </div>
    );
};

export default OnboardPage;
