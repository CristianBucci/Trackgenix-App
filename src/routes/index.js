import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styles from './routes.module.css';
import PrivateRoute from './PrivateRoute';
import { tokenListener } from 'helpers/firebase';
import Footer from 'Components/Footer';

const Home = lazy(() => import('./home'));
const AuthRoutes = lazy(() => import('./auth'));
const SuperAdminRoutes = lazy(() => import('./superAdmins'));
const AdminRoutes = lazy(() => import('./admins'));
const EmployeeRoutes = lazy(() => import('./employees'));

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
          <Route path="/home" component={Home} />
          <Route path="/auth" component={AuthRoutes} />
          <PrivateRoute exact path="/admins" role="ADMIN" component={AdminRoutes} />
          <PrivateRoute path="/super-admins" role="SUPER_ADMIN" component={SuperAdminRoutes} />
          <PrivateRoute path="/employees" role="EMPLOYEE" component={EmployeeRoutes} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    </Suspense>
  );
};

export default Layout;
