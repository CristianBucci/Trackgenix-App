import { combineReducers } from 'redux';
import adminsReducer from '../admins/reducer';
import empolyeesReducer from '../employees/reducer';
import projectsReducer from '../projects/reducer';
import superAdminsReducer from '../super-admins/reducer';
import tasksReducer from '../tasks/reducer';
import timesheetsReducer from '../timesheets/reducer';

const rootReducer = combineReducers({
  employees: empolyeesReducer,
  admins: adminsReducer,
  projects: projectsReducer,
  superAdmins: superAdminsReducer,
  tasks: tasksReducer,
  timesheets: timesheetsReducer
});

export default rootReducer;
