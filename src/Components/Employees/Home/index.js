import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import { Link } from 'react-router-dom';

import Sidebar from 'Components/Employees/Sidebar';
import styles from './home.module.css';

const EmployeesHome = () => {
  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const { list: projectsList, isLoading } = useSelector((state) => state.projects);

  useEffect(() => {
    setFilteredList(parseFilteredProjects());
  }, [projectsList]);

  const [filteredList, setFilteredList] = useState([]);

  const dispatch = useDispatch();

  const id = '637b848509e8dffba1304058';

  const fixDate = (date) => {
    let dateFormated = date.substr(0, 10);
    return dateFormated;
  };

  const parseFilteredProjects = () => {
    let listData = [];
    projectsById.forEach((element) => {
      listData.push({
        id: element._id,
        name: element.name,
        description: element.description,
        clientName: element.clientName,
        startDate: fixDate(element.startDate),
        endDate: fixDate(element.endDate),
        role: element.employees.filter((employee) => employee.employeeId._id === id)[0].role
      });
    });
    return listData;
  };

  const projectsById = projectsList.filter((projects) => {
    let result;
    if (projects.employees.length > 0) {
      for (let i = 0; i < projects.employees.length; i++) {
        result = projects.employees[i].employeeId?._id === id;
      }
    }
    return result;
  });

  const headers = [
    'Project Name',
    'Desription',
    'Client Name',
    'Starting Date',
    'End Date',
    'Role'
  ];
  const dataValues = ['name', 'description', 'clientName', 'startDate', 'endDate', 'role'];

  return (
    <div className={styles.projectsWrapper}>
      <Sidebar />
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <img src="/assets/images/spinner.gif" alt="spinner" />
        </div>
      ) : (
        <>
          {filteredList.length == 0 ? (
            <h1 className={styles.h1}>You are not assigned to any projects.</h1>
          ) : (
            <table className={styles.table}>
              <thead className={styles.header}>
                <tr>
                  {headers.map((header, index) => {
                    return <th key={index}>{header}</th>;
                  })}
                  <th key={headers.length - 1}>Add hours</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((item) => {
                  return (
                    <>
                      <tr key={item.id} className={styles.row}>
                        {dataValues.map((value, index) => {
                          return (
                            <>
                              <td key={index}>{item[value]}</td>
                            </>
                          );
                        })}
                        <td key={item.id}>
                          <div className={styles.btnContainer}>
                            <Link to={`timesheets/${item.id}`}>
                              <button className={styles.button}>
                                <img src="/assets/images/add.svg" alt="add" />
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeesHome;
