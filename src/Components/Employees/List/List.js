import React from 'react';
import style from './list.module.css';

const List = ({ employees, deleteEmployee }) => {
  return (
    <section>
      <div className={style.title}>
        <h2>Employees</h2>
        <a href={'employees/form'}>
          <button>Create Employee</button>
        </a>
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
                    <button
                      onClick={() => window.location.assign(`/employees/form?id=${employee._id}`)}
                    >
                      <img src="/assets/images/pencil.png" alt="update" />
                    </button>
                    <button onClick={() => deleteEmployee(employee._id)}>
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
