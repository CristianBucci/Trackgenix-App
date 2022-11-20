import React from 'react';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';

const Sidebar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.rutes}>
        <li>
          <Link to="/home">Projects</Link>
        </li>
        <li>
          <Link to="/timeSheets">TimeSheets</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
