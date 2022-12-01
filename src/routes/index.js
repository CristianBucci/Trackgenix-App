import React, { lazy, Suspense, useEffect } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import styles from './routes.module.css';
import PrivateRoute from './PrivateRoute';
import { tokenListener } from 'helpers/firebase';

const EmployeeRoutes = lazy(() => import('./employees'));
const AdminRoutes = lazy(() => import('./admins'));
const SuperAdminRoutes = lazy(() => import('./superAdmins'));
const ProjectsRoutes = lazy(() => import('./projects'));
const TasksRoutes = lazy(() => import('./tasks'));
const TimeSheetsRoutes = lazy(() => import('./timeSheets'));
const AuthRoutes = lazy(() => import('./auth'));

const Layout = () => {
  useEffect(() => {
    tokenListener();
  }, []);

  return (
    <Suspense
      fallback={
        <div>
          <img src="/assets/images/spinner.gif" alt="spinner" />
        </div>
      }
    >
      <div className={styles.container}>
        <Switch>
          <PrivateRoute path="/employees/" role="EMPLOYEE" component={EmployeeRoutes} />
          <PrivateRoute exact path="/admins" role="ADMIN" component={AdminRoutes} />
          <PrivateRoute
            exact
            path="/super-admins"
            role="SUPER_ADMIN"
            component={SuperAdminRoutes}
          />
          <Route exact path="/projects" component={ProjectsRoutes} />
          <Route exact path="/timesheets" component={TimeSheetsRoutes} />
          <Route exact path="/tasks" component={TasksRoutes} />
          <Route path="/auth" component={AuthRoutes} />
          <Redirect to="/auth" />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </div>
    </Suspense>
  );
};

export default Layout;
