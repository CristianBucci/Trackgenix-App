import React from 'react';
import styles from './sidebar.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Sidebar = () => {
  const { routes } = useSelector((state) => state.routes);
  const auth = useSelector((store) => {
    return store.auth;
  });
  if (auth.isAuthenticated) {
    return (
      <aside className={styles.sidebar}>
        <ul>
          {routes.map((route, index) => {
            return (
              <li className={styles.hover} key={index}>
                <Link to={route.url}>{route.title}</Link>
              </li>
            );
          })}
        </ul>
      </aside>
    );
  } else {
    return null;
  }
};
export default Sidebar;
