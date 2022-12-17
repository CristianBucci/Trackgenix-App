import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { confirmModalOpen } from 'redux/super-admins/actions';
import styles from './navbar.module.css';

const NavBar = () => {
  const dispatch = useDispatch();

  const onSubmit = () => {
    const content = 'Are you sure you want to logout?';
    dispatch(confirmModalOpen(content));
  };

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.nav}>
          <li>
            <Link to="/super-admins">Admins</Link>
          </li>
          <li>
            <Link to="/super-admins/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={onSubmit}>Logout</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
