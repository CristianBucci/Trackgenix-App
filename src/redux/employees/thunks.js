import { getEmployeesPending, getEmployeesSuccess, getEmployeesError } from './actions';

export const getEmployees = () => {
  return async (dispatch) => {
    dispatch(getEmployeesPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      dispatch(getEmployeesSuccess(data.data));
      return data.data;
    } catch (error) {
      dispatch(getEmployeesError(error.toString()));
    }
  };
};
