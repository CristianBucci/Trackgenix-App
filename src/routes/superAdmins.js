import React, { lazy } from 'react';
import { Suspense } from 'react';
import { useRouteMatch, Route, Switch, BrowserRouter } from 'react-router-dom';

const SuperAdminsHome = lazy(() => import('Components/SuperAdmins/Home'));
const AdminForm = lazy(() => import('Components/SuperAdmins/Admins'));
const SuperAdminProfile = lazy(() => import('Components/SuperAdmins/Profile'));
const NavBar = lazy(() => import('Components/SuperAdmins/NavBar'));

const SuperAdminRoutes = () => {
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
        <NavBar />
        <Switch>
          <Route exact path={`${url}/`} component={SuperAdminsHome} />
          <Route exact path={`${url}/admins`} component={AdminForm} />
          <Route path={`${url}/admins/:id`} component={AdminForm} />
          <Route path={`${url}/profile`} component={SuperAdminProfile} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default SuperAdminRoutes;
