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
                    <Link to="#">Create Incident</Link>
                </li>
                <li>
                    <Link to="#">Create Project</Link>
                </li>

                <li>
                    <Link to='/'>
                        Logout
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
