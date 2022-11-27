import React, { lazy, Suspense, useEffect } from 'react';
import { Redirect, Switch, Route, Link } from 'react-router-dom';
import styles from './routes.module.css';

import { tokenListener } from 'helpers/firebase';
import Header from 'Components/Header/index';
import Footer from 'Components/Footer/index';
import Home from 'Components/Home/index';
import Admins from 'Components/Admins/index';
import AdminsForm from 'Components/Admins/Form';
import SuperAdminsList from 'Components/SuperAdmins/index';
import SuperAdminsListForm from 'Components/SuperAdmins/Form/Form';

const Employee = lazy(() => import('./employees'));
const AuthRoutes = lazy(() => import('./auth'));

import Projects from 'Components/Projects';
import ProjectsForm from 'Components/Projects/Form';
import TimeSheets from 'Components/TimeSheets/index';
import TimeSheetsForm from 'Components/TimeSheets/Form';
import Tasks from 'Components/Tasks/index';
import TasksForm from 'Components/Tasks/Form';

function Layout() {
  useEffect(() => {
    tokenListener();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.container}>
        <Header />
        <Switch>
          <Route
            exact
            path="/home"
            render={() => (
              <>
                <Link to="/employees/home"> Go to employees Home</Link>
                <Home />
              </>
            )}
          />
          <Route path="/auth" component={AuthRoutes} />
          <Route path="/employees" component={Employee} />
          <Route exact path="/admins" component={Admins} />
          <Route path="/admins/form" component={AdminsForm} />
          <Route path="/admins/:Id" component={AdminsForm} />
          <Route exact path="/super-admins" component={SuperAdminsList} />
          <Route path="/super-admins/form" component={SuperAdminsListForm} />
          <Route path="/super-admins/:id" component={SuperAdminsListForm} />
          <Route exact path="/projects" component={Projects} />
          <Route path="/projects/form" component={ProjectsForm} />
          <Route path="/projects/:id" component={ProjectsForm} />
          <Route exact path="/timesheets" component={TimeSheets} />
          <Route path="/timesheets/form" component={TimeSheetsForm} />
          <Route path="/timesheets/:id" component={TimeSheetsForm} />
          <Route exact path="/tasks" component={Tasks} />
          <Route path="/tasks/form" component={TasksForm} />
          <Route path="/tasks/:id" component={TasksForm} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Suspense>
  );
}
export default Layout;
