import React, { lazy } from 'react';
import { Suspense } from 'react';
import { useRouteMatch, Route, Switch, BrowserRouter } from 'react-router-dom';

const AdminsHome = lazy(() => import('Components/Admins/Home'));
const ProjectsForm = lazy(() => import('Components/Admins/Projects'));
const EmployeesList = lazy(() => import('Components/Admins/Employees'));
const EmployeesForm = lazy(() => import('Components/Admins/Employees/Form'));
const AdminProfile = lazy(() => import('Components/Admins/Profile'));

const AdminsRouter = () => {
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
          <Route exact path={`${url}/`} component={AdminsHome} />
          <Route exact path={`${url}/projects`} component={ProjectsForm} />
          <Route path={`${url}/projects/:id`} component={ProjectsForm} />
          <Route exact path={`${url}/employees`} component={EmployeesList} />
          <Route path={`${url}/employees/form/:id`} component={EmployeesForm} />
          <Route path={`${url}/profile`} component={AdminProfile} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default AdminsRouter;
