import React, { lazy, Suspense } from 'react';
import { useRouteMatch, Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRoutes } from 'redux/routes/thunks';
import { Spinner } from 'Components/Shared/Spinner';

const EmployeesHome = lazy(() => import('Components/Employees/Home'));
const EmployeeProfile = lazy(() => import('Components/Employees/Profile'));
const EmployeeTimeSheet = lazy(() => import('Components/Employees/TimeSheet'));

const Employee = () => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const routes = [
    { title: 'Projects', url: `${url}/` },
    { title: 'Timesheets', url: `${url}/timesheets` },
    { title: 'Profile', url: `${url}/profile` }
  ];
  dispatch(setRoutes(routes));
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path={`${url}/`} component={EmployeesHome} />
          <Route exact path={`${url}/timesheets`} component={EmployeeTimeSheet} />
          <Route path={`${url}/timesheets/:id`} component={EmployeeTimeSheet} />
          <Route path={`${url}/profile`} component={EmployeeProfile} />
          <Redirect to={`${url}/`} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Employee;
