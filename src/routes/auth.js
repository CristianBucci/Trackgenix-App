import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Layout';
import Login from 'Components/Auth/Login';
import SignUp from 'Components/Auth/SignUp';

const routes = [
  {
    name: 'Login',
    path: '/auth/Login'
  },
  {
    name: 'SignUp',
    path: '/auth/SignUp'
  }
];

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route path={`${url}/login`} component={Login} />
        <Route path={`${url}/sign-up`} component={SignUp} />
        <Redirect to={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
