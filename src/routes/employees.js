import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

const Employees = lazy(() => import('Components/Employees/index'));
const EmployeesHome = lazy(() => import('Components/Employees/Home'));
const EmployeesForm = lazy(() => import('Components/Employees/Form'));
const EmployeeProfile = lazy(() => import('Components/Employees/Profile'));
const EmployeeTimeSheet = lazy(() => import('Components/Employee/Timesheet'));

const routes = [
  { name: 'home', path: '/employees/home' },
  { name: 'form', path: '/employees/form' },
  { name: 'form', path: '/employees/form/:id' },
  { name: 'profile', path: '/employees/profile/:id' },
  { name: 'timesheets', path: '/employees/timesheets' },
  { name: 'timesheets', path: '/employees/timesheets/:id' }
];

const Employee = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={Employees} />
        <Route path={`${url}/home`} component={EmployeesHome} />
        <Route path={`${url}/timesheets`} component={EmployeeTimeSheet} />
        <Route path={`${url}/timesheets/:id`} component={EmployeeTimeSheet} />
        <Route path={`${url}/profile/:id`} component={EmployeeProfile} />
        <Route exact path={`${url}/form`} component={EmployeesForm} />
        <Route path={`${url}/form/:id`} component={EmployeesForm} />
      </Switch>
    </Layout>
  );
};

export default Employee;
