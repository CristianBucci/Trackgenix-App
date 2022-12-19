import React, { lazy, Suspense } from 'react';
import { useRouteMatch, Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

const EmployeesHome = lazy(() => import('Components/Employees/Home'));
const EmployeeProfile = lazy(() => import('Components/Employees/Profile'));
const EmployeeTimeSheet = lazy(() => import('Components/Employees/TimeSheet'));
const ProjectsForm = lazy(() => import('Components/Employees/Projects'));

const Employee = () => {
  const { url } = useRouteMatch();
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div>
            <img src="/assets/images/spinner.gif" alt="spinner" />
          </div>
        }
      >
        <Switch>
          <Route exact path={`${url}/`} component={EmployeesHome} />
          <Route exact path={`${url}/timesheets`} component={EmployeeTimeSheet} />
          <Route path={`${url}/timesheets/:id`} component={EmployeeTimeSheet} />
          <Route path={`${url}/projects/form/:id`} component={ProjectsForm} />
          <Route path={`${url}/profile`} component={EmployeeProfile} />
          <Redirect to={`${url}/`} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Employee;
