import React from 'react';
import { useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {

    const { user } = useSelector( state => state.user.userInfo);

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.setItem("tokenUser", "");
        navigate("/login");
    }

    return (
        <nav className={styles.nav_app}>
            <h3>Organizer App</h3>
            <div>
                <span>Hi!, { user.name }</span>
                <button onClick={ () => logOut() }>
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;