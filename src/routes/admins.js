import React, { lazy } from 'react';
import { Suspense } from 'react';
import { useRouteMatch, Route, Switch, BrowserRouter } from 'react-router-dom';

const adminHome = lazy(() => import('Components/Admins/Home'));
const adminForm = lazy(() => import('Components/Admins/Form'));

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
          <Route exact path={`${url}/`} component={adminHome} />
          <Route path={`${url}/form`} component={adminForm} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default AdminsRouter;
