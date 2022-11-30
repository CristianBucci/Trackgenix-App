import React from 'react';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';
import { logout } from 'redux/auth/thunks';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
  const dispatch = useDispatch();
  const logoutUser = () => dispatch(logout());
  return (
    <aside className={styles.sidebar}>
      <ul>
        <li>
          <Link to="/employees/home">Projects</Link>
        </li>
        <li>
          <Link to="/employees/timesheets">Timesheets</Link>
        </li>
        <li>
          <Link to="/employees/profile">Profile</Link>
        </li>
        <li>
          <Link onClick={logoutUser}>Logout</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
