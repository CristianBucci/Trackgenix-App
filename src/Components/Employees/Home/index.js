import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';

import Table from 'Components/Shared/Table/Table';
import Sidebar from 'Components/Employees/Sidebar';
import styles from './home.module.css';

const EmployeesHome = () => {
  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const { list: projectsList, isLoading } = useSelector((state) => state.projects);

  // eslint-disable-next-line no-unused-vars
  const [filteredList, setFilteredList] = useState([]);

  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const id = '637b848509e8dffba1304058';

  const projectsById = projectsList.filter((projects) => {
    let result;
    if (projects.employees.length > 0) {
      for (let i = 0; i < projects.employees.length; i++) {
        result = projects.employees[i].employeeId?._id === id;
      }
    }
    return result;
  });

  console.log('PROJECT FILTER', projectsById);

  return (
    <div className={styles.projectsWrapper}>
      <Sidebar />
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <img src="/assets/images/spinner.gif" alt="spinner" />
        </div>
      ) : (
        <>
          {projectsById.length > 0 ? (
            <>
              <h1>Projects table </h1>
              <Table
                data={[]}
                headers={[
                  'Project Name',
                  'Desription',
                  'Client Name',
                  'Starting Date',
                  'End Date',
                  'Employees'
                ]}
                dataValues={[
                  'name',
                  'description',
                  'clientName',
                  'startDate',
                  'endDate',
                  'employees'
                ]}
                location={location}
                // setShowModal={modalWrapper}
              />
            </>
          ) : (
            <h1>Not projects found!</h1>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeesHome;
