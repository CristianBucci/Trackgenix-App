import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Employees from 'Components/Employees/index';
import EmployeesForm from 'Components/Employees/Form';
import EmployeesHome from 'Components/Employees/Home';
import EmployeeTimeSheets from 'Components/Employees/TimeSheets';
import EmployeeProfile from 'Components/Employees/Profile';

const Employee = () => {
  return (
    <Switch>
      <Route exact path="/employees" component={Employees} />
      <Route path="/employees/home" component={EmployeesHome} />
      <Route path="/employees/timesheets" component={EmployeeTimeSheets} />
      <Route path="/employees/profile" component={EmployeeProfile} />
      <Route path="/employees/form" component={EmployeesForm} />
      <Route path="/employees/:id" component={EmployeesForm} />
    </Switch>
  );
};

export default Employee;
