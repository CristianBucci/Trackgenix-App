import React, { lazy } from 'react';
import { Suspense } from 'react';
import { useRouteMatch, Route, Switch, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRoutes } from 'redux/routes/thunks';
import { Spinner } from 'Components/Shared/Spinner';

const SuperAdminsHome = lazy(() => import('Components/SuperAdmins/Home'));
const AdminForm = lazy(() => import('Components/SuperAdmins/Admins'));
const SuperAdminProfile = lazy(() => import('Components/SuperAdmins/Profile'));
const NavBar = lazy(() => import('Components/SuperAdmins/NavBar'));

const SuperAdminRoutes = () => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const routes = [
    { title: 'Admins', url: `${url}/` },
    { title: 'Profile', url: `${url}/profile` }
  ];
  dispatch(setRoutes(routes));
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
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
