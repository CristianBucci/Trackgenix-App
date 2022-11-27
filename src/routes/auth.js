import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
const Login = lazy(() => import('Components/Auth/Login'));
const SignUp = lazy(() => import('Components/Auth/SignUp'));

const routes = [{ name: 'Login', path: '/auth/login' }, { name: 'Sign Up', path: '/auth/sign-up' }];

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
      <Switch>
        <Route path={`${url}/login`} component={Login} />
        <Route path={`${url}/sign-up`} component={SignUp} />
        <Redirect to={`${url}/login`} />
      </Switch>
  );
};

export default AuthRoutes;