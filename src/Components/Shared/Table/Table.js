import React, { useState } from 'react';
import styles from './Table.module.css';
import { Link } from 'react-router-dom';

const Table = ({ data, headers, dataValues, setShowModal, location }) => {
  const [search, setSearch] = useState('');

  const results = !search
    ? data
    : data.filter(
        (dato) =>
          dato.name?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          dato.lastName?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          dato.email?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          dato.phone?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          dato.clientName?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          dato.startDate?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          dato.endDate?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          dato.employees?.toLowerCase().includes(search.toLocaleLowerCase())
      );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.searchBox}>
            <img src="/assets/images/lens.svg" alt="update" />
            <input
              type="text"
              placeholder="Search..."
              className="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
          </div>
          <Link to={`.${location.pathname}/form`}>
            <button className={styles.createBtn}>+</button>
          </Link>
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
          <tbody className={styles.body}>
            {results.map((item) => {
              const openModal = () => {
                setShowModal(item._id);
              };
              return (
                <>
                  <tr key={item._id} className={styles.row}>
                    {dataValues.map((value, index) => {
                      return (
                        <>
                          <td key={index}>{item[value]}</td>
                        </>
                      );
                    })}
                    <td key={item._id}>
                      <div className={styles.btnContainer}>
                        <Link to={`${location.pathname}/${item._id}`}>
                          <button className={styles.button}>
                            <img src="/assets/images/edit.svg" alt="update" />
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
    </>
  );
};

export default Table;
