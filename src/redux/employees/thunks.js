import { getEmployeesPending, getEmployeesSuccess, getEmployeesError } from './actions';

export const getEmployees = () => {
  return async (dispatch) => {
    dispatch(getEmployeesPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const response_1 = await response.json();
      dispatch(getEmployeesSuccess(response_1.data));
      return response_1.data;
    } catch (error) {
      dispatch(getEmployeesError(error.toString()));
      // error should be display in a modal
    }
  };
};
