import React, { lazy } from 'react';
import { Suspense } from 'react';
import { useRouteMatch, Route, Switch, BrowserRouter } from 'react-router-dom';
import { Spinner } from 'Components/Shared/Spinner';
import Sidebar from 'Components/Shared/Sidebar';

const Home = lazy(() => import('Components/Home/index'));

const HomeRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Sidebar />
        <Switch>
          <Route exact path={`${url}/`} component={Home} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default HomeRoutes;
