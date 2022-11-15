import {
  getEmployeesPending,
  getEmployeesSuccess,
  getEmployeesError,
  deleteEmployeePending,
  deleteEmployeeSuccess,
  deleteEmployeeError
} from './actions';

export const getEmployees = () => {
  return async (dispatch) => {
    dispatch(getEmployeesPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      dispatch(getEmployeesSuccess(data.data));
    } catch (error) {
      dispatch(getEmployeesError(error.toString()));
    }
  };
};

export const deleteEmployee = (id) => {
  return async (dispatch) => {
    dispatch(deleteEmployeePending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      if (response.status == 204) {
        dispatch(deleteEmployeeSuccess(id));
      } else {
        const data = await response.json();
        dispatch(deleteEmployeeError(data.data));
      }
    } catch (error) {
      dispatch(deleteEmployeeError(error.toString()));
    }
  };
};
