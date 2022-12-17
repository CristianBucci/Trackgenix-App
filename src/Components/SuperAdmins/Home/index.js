/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './home.module.css';
import { deleteAdmins, getAdmins, getByIdAdmin, updateAdmins } from 'redux/admins/thunks';
import { Link } from 'react-router-dom';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import { confirmModalClose, confirmModalOpen } from 'redux/admins/actions';
import NavBar from '../NavBar';
import { logout } from 'redux/auth/thunks';

const SuperAdminsHome = () => {
  const token = sessionStorage.getItem('token');

  const dispatch = useDispatch();
  const {
    list: adminsList,
    isLoading,
    showConfirmModal,
    modalContent
  } = useSelector((state) => state.admins);
  const [search, setSearch] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const [values, setValues] = useState('');
  const [admin, setAdmin] = useState(null);
  const [itemId, setItemId] = useState(null);

  const headers = ['Name', 'Last Name', 'Email'];
  const dataValues = ['name', 'lastName', 'email'];

  const results = !search
    ? adminsList
    : adminsList.filter(
        (value) =>
          value.name?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          value.lastName?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          value.email?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          value.description?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          value.phone?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          value.clientName?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          value.startDate?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          value.endDate?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          value.employees?.toLowerCase().includes(search.toLocaleLowerCase())
      );

  const onConfirm = () => {
    if (modalContent.content.includes('logout')) {
      dispatch(logout());
    } else {
      console.log(itemId);
      dispatch(deleteAdmins(itemId, token));
    }
    dispatch(confirmModalClose());
  };
  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  useEffect(() => {
    dispatch(getAdmins(token));
  }, []);

  return (
    <>
      <ModalConfirm
        show={showConfirmModal}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <div className={styles.projectsWrapper}>
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <img src="/assets/images/spinner.gif" alt="spinner" />
          </div>
        ) : (
          <>
            {adminsList.length == 0 ? (
              <h1 className={styles.h1}>Admins not found.</h1>
            ) : (
              <div className={styles.container}>
                <div className={styles.top}>
                  <div className={styles.searchBox}>
                    <img src="/assets/images/lens.svg" alt="lens" />
                    <input
                      type="search"
                      placeholder="Search.."
                      className="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <Link to={`/super-admins/admins`}>
                      <button className={styles.button}>
                        <img src="/assets/images/add.svg" alt="add" />
                      </button>
                    </Link>
                  </div>
                </div>
                <table className={styles.table}>
                  <thead className={styles.header}>
                    <tr>
                      {headers.map((header, index) => {
                        return <th key={index}>{header}</th>;
                      })}
                      <th key={headers.length - 1}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((item) => {
                      const id = item._id;
                      const openModal = () => {
                        setItemId(id);
                        const content = 'Are you sure you want to delete this Admin?';
                        dispatch(confirmModalOpen(content));
                      };
                      return (
                        <>
                          <tr key={id} className={styles.row}>
                            {dataValues.map((value, index) => {
                              return (
                                <>
                                  <td key={index}>{item[value]}</td>
                                </>
                              );
                            })}
                            <td key={id}>
                              <div className={styles.btnContainer}>
                                <Link to={`/super-admins/admins/${id}`}>
                                  <button className={styles.button}>
                                    <img src="/assets/images/edit.svg" alt="edit" />
                                  </button>
                                </Link>
                                <button onClick={openModal} className={styles.button}>
                                  <img src="/assets/images/trash.svg" alt="delete" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SuperAdminsHome;
