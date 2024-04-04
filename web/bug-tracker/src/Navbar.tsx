import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = (props: { userName: any; }) => {
    return (
        <nav className="navCustom">
            <Link to="/home" className='homeNavCustom' state={{"username":props.userName}}>
                Bug-Tracker
            </Link>
            <ul>
                <li>
                    <Link to="/manage" state={{"username":props.userName}}>
                        Assign Incidents
                    </Link>
                </li>
                <li>
                    <Link to="/incident" state={{"username":props.userName}}>Create Incident</Link>
                </li>
                <li>
                    <Link to="/project" state={{"username":props.userName}}>Create Project</Link>
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
