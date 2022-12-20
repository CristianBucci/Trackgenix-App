import {
  getEmployeesPending,
  getEmployeesSuccess,
  getEmployeesError,
  getByIdEmployeePending,
  getByIdEmployeeSuccess,
  getByIdEmployeeError,
  deleteEmployeePending,
  deleteEmployeeSuccess,
  deleteEmployeeError,
  postEmployeePending,
  postEmployeeSuccess,
  postEmployeeError,
  putEmployeePending,
  putEmployeeSuccess,
  putEmployeeError
} from './actions';

export const getEmployees = (token) => {
  return async (dispatch) => {
    dispatch(getEmployeesPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        headers: { token }
      });
      const data = await response.json();
      dispatch(getEmployeesSuccess(data.data));
    } catch (error) {
      dispatch(getEmployeesError(error.toString()));
    }
  };
};

export const getByIdEmployee = (id, token) => {
  return async (dispatch) => {
    dispatch(getByIdEmployeePending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        headers: { token }
      });
      const json = await response.json();
      if (response.status !== 200) {
        dispatch(getByIdEmployeeError(json.msg.toString()));
      } else {
        dispatch(getByIdEmployeeSuccess(json.data));
      }
    } catch (error) {
      dispatch(getByIdEmployeeError(error.toString()));
    }
  };
};

export const deleteEmployee = (id, token) => {
  return async (dispatch) => {
    dispatch(deleteEmployeePending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'DELETE',
        headers: {
          token,
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

export const createEmployee = (newEmployee, token) => {
  return async (dispatch) => {
    dispatch(postEmployeePending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'POST',
        headers: {
          token,
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(newEmployee)
      });
      if (response.status == 201) {
        dispatch(postEmployeeSuccess(response));
      } else {
        const data = await response.json();
        dispatch(postEmployeeError(data.data));
      }
    } catch (error) {
      dispatch(postEmployeeError(error.toString()));
    }
  };
};

export const updateEmployee = (id, data, token) => {
  return async (dispatch) => {
    dispatch(putEmployeePending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
          token,
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
      });
      if (response.status === 200) {
        dispatch(putEmployeeSuccess(response));
      } else {
        const data = await response.json();
        dispatch(putEmployeeError(data));
      }
    } catch (error) {
      dispatch(putEmployeeError(error.toString()));
    }
  };
};
