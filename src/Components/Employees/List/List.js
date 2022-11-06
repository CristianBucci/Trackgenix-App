import React from 'react';
import { Link } from 'react-router-dom';

import style from './list.module.css';

const List = ({ employees, deleteEmployee }) => {
  const handleDelete = (id) => {
    deleteEmployee(id);
  };

  return (
    <section>
      <div className={style.title}>
        <h2>Employees</h2>
        <Link to={'/employees/form'}>
          <button className={style.buttonCreate}>Create Employee</button>
        </Link>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              return (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.email}</td>
                  <td>
                    <Link to={`/employees/${employee._id}`}>
                      <button className={style.btnIcons}>
                        <img src="/assets/images/pencil.png" alt="update" />
                      </button>
                    </Link>
                    <button className={style.btnIcons} onClick={() => handleDelete(employee._id)}>
                      <img src="/assets/images/trash.png" alt="delete" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default List;
