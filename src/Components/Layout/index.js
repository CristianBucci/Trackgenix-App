import Header from '../Header/index';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import AdminsForm from '../Admins/Form/index';
import SuperAdminsList from '../SuperAdmins/index';
import SuperAmdminsForm from '../SuperAdmins/Form/Form';
import Home from '../Home/index';
import styles from './layout.module.css';
import Employees from '../Employees/index';
import EmployeesForm from '../Employees/Form/index';
import Projects from '../Projects';
import ProjectsForm from '../Projects/Form/index';
import TimeSheets from '../TimeSheets/index';
import TimeSheetsForm from '../TimeSheets/Form/index';
import Tasks from '../Tasks/index';
import TasksForm from '../Tasks/Form/Form';

function Layout() {
  let currentScreen = <Home />;
  switch (window.location.pathname) {
    case '/admins':
      currentScreen = <Admins />;
      break;
    case '/admins/form':
      currentScreen = <AdminsForm />;
      break;
    case '/super-admins':
      currentScreen = <SuperAdminsList />;
      break;
    case '/super-admins/form':
      currentScreen = <SuperAmdminsForm />;
      break;
    case '/employees':
      currentScreen = <Employees />;
      break;
    case '/employees/form':
      currentScreen = <EmployeesForm />;
      break;
    case '/projects':
      currentScreen = <Projects />;
      break;
    case '/projects/form':
      currentScreen = <ProjectsForm />;
      break;
    case '/timesheets':
      currentScreen = <TimeSheets />;
      break;
    case '/timesheets/form':
      currentScreen = <TimeSheetsForm />;
      break;
    case '/tasks':
      currentScreen = <Tasks />;
      break;
    case '/tasks/form':
      currentScreen = <TasksForm />;
      break;
    default:
      break;
  }

  return (
    <div className={styles.container}>
      <Header />
      {currentScreen}
      <Footer />
    </div>
  );
}

export default Layout;
