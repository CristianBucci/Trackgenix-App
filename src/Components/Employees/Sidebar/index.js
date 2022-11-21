import React from 'react';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <ul>
        <li>
          <Link to="/employees/home">Projects</Link>
        </li>
        <li>
          <Link to="/employees/timeSheets">TimeSheets</Link>
        </li>
        <li>
          <Link to="/employees/profile">Profile</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
