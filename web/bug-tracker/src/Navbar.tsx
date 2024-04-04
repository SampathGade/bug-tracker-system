import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="nav">
            <Link to="/home" className='homeNav'>
                Bug-Tracker
            </Link>
            <ul>
                <li>
                    <Link to="/incidents">All Incidents</Link>
                </li>
                <li>
                    <Link to="/projects">Projects</Link>
                </li>

                <li>
                    <Link to='/logout'>
                        Logout
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
