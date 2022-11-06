import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import styles from './layout.module.css';
import Header from '../Header/index';
import Footer from '../Footer/index';
import Home from '../Home/index';
import Admins from '../Admins/index';
import AdminsForm from '../Admins/Form';
import SuperAdminsList from '../SuperAdmins/index';
import SuperAdminsForm from '../SuperAdmins/Form/Form';
import Employees from '../Employees/index';
import EmployeesForm from '../Employees/Form';
import Projects from '../Projects';
import ProjectsForm from '../Projects/Form';
import TimeSheets from '../TimeSheets/index';
import TimeSheetsForm from '../TimeSheets/Form';
import Tasks from '../Tasks/index';
import TasksForm from '../Tasks/Form/Form';

function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/admins" component={Admins} />
        <Route path="/admins/form" component={AdminsForm} />
        <Route path="/admins/:Id" component={AdminsForm} />
        <Route exact path="/super-admins" component={SuperAdminsList} />
        <Route path="/super-admins/form" component={SuperAdminsForm} />
        <Route path="/super-admins/:id" component={SuperAdminsForm} />
        <Route exact path="/employees" component={Employees} />
        <Route path="/employees/form" component={EmployeesForm} />
        <Route path="/employees/:id" component={EmployeesForm} />
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
  );
}
export default Layout;
