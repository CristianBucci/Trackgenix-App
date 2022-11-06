import React from 'react';
//import Modal from './Modal/Modal';
import styles from './Table.module.css';
import { Link } from 'react-router-dom';

const Table = ({ data, headers }) => {
  //const [showModal, setShowModal] = useState(false);
  //const [delId, setDelId] = useState('');
  /* const closeModal = () => {
    setShowModal(false);
  }; */
  /* const deleteHandler = async () => {
    deleteSuperAdmin(delId);
    setShowModal(false);
    setDelId('');
  }; */

  return (
    <div>
      <Link to={'./super-admins/form'}>
        <button className={styles.createBtn}>Create new</button>
      </Link>
      <table className={styles.table}>
        <thead>
          <tr className={styles.row}>
            {headers.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
            <th key={headers.length - 1}>actions</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {data.map((item) => {
            return (
              <>
                <tr key={item._id}>
                  {headers.map((header, index) => {
                    return (
                      <>
                        <td key={index}>{item[header]}</td>
                      </>
                    );
                  })}
                  <td key={item._id}>
                    <button>o</button>
                    <button>o</button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
