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

  useEffect(() => {
    setFilteredList(parseFilteredProjects());
  }, [projectsList]);

  // eslint-disable-next-line no-unused-vars
  const [filteredList, setFilteredList] = useState([]);

  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const id = '637b848509e8dffba1304058';

  const parseFilteredProjects = () => {
    let listData = [];
    projectsById.forEach((element) => {
      listData.push({
        name: element.name,
        description: element.description,
        clientName: element.clientName,
        startDate: element.startDate,
        endDate: element.endDate,
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

  return (
    <div className={styles.projectsWrapper}>
      <Sidebar />
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <img src="/assets/images/spinner.gif" alt="spinner" />
        </div>
      ) : (
        <>
          {filteredList.length > 0 ? (
            <>
              <h1>Projects table </h1>
              <Table
                data={filteredList}
                headers={[
                  'Project Name',
                  'Desription',
                  'Client Name',
                  'Starting Date',
                  'End Date',
                  'Role'
                ]}
                dataValues={['name', 'description', 'clientName', 'startDate', 'endDate', 'role']}
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
