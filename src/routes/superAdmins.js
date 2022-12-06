import React, { lazy } from 'react';
import { Suspense } from 'react';
import { useRouteMatch, Route, Switch, BrowserRouter } from 'react-router-dom';

const superAdminHome = lazy(() => import('Components/SuperAdmins/Home'));
const SuperAdminsProfile = lazy(() => import('Components/SuperAdmins/Profile'));

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
        <Switch>
          <Route exact path={`${url}/`} component={superAdminHome} />
          <Route path={`${url}/profile`} component={SuperAdminsProfile} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default SuperAdminRoutes;
