import React, { lazy } from 'react';
import { Suspense } from 'react';
import { useRouteMatch, Route, Switch, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRoutes } from 'redux/routes/thunks';
import { Spinner } from 'Components/Shared/Spinner';

const AdminsHome = lazy(() => import('Components/Admins/Home'));
const ProjectsForm = lazy(() => import('Components/Admins/Projects/Form'));
const Employees = lazy(() => import('Components/Admins/Employees'));
const EmployeesForm = lazy(() => import('Components/Admins/Employees/Form'));
const AdminProfile = lazy(() => import('Components/Admins/Profile'));

const AdminsRouter = () => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const routes = [
    { title: 'Projects', url: `${url}/` },
    { title: 'Employees', url: `${url}/employees` },
    { title: 'Profile', url: `${url}/profile` }
  ];
  dispatch(setRoutes(routes));
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path={`${url}/home`} component={AdminsHome} />
          <Route exact path={`${url}/admins/home/form`} component={ProjectsForm} />
          <Route exact path={`${url}/home/:id`} component={ProjectsForm} />
          <Route exact path={`${url}/employees`} component={Employees} />
          <Route exact path={`${url}/admins/employees/form`} component={EmployeesForm} />
          <Route exact path={`${url}/employees/:id`} component={EmployeesForm} />
          <Route exact path={`${url}/profile`} component={AdminProfile} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default AdminsRouter;
