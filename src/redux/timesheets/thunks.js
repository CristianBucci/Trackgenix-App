import {
  getTimesheetsPending,
  getTimesheetsSuccess,
  getTimesheetsError,
  getByIdTimesheetsPending,
  getByIdTimesheetsSuccess,
  getByIdTimesheetsError,
  deleteTimesheetsPending,
  deleteTimesheetsSuccess,
  deleteTimesheetsError,
  postTimesheetsPending,
  postTimesheetsSuccess,
  postTimesheetsError,
  putTimesheetsPending,
  putTimesheetsSuccess,
  putTimesheetsError
} from './actions';

export const getTimesheets = (token) => {
  return async (dispatch) => {
    dispatch(getTimesheetsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`, {
        headers: token
      });
      const data = await response.json();
      dispatch(getTimesheetsSuccess(data.data));
    } catch (error) {
      dispatch(getTimesheetsError(error.toString()));
    }
  };
};

export const getByIdTimesheet = (id, token) => {
  return async (dispatch) => {
    dispatch(getByIdTimesheetsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
        headers: token
      });
      const data = await response.json();
      if (response.status == 200) {
        dispatch(getByIdTimesheetsSuccess(data.data));
      } else {
        dispatch(getByIdTimesheetsError(data.msg.toString()));
      }
    } catch (error) {
      dispatch(getByIdTimesheetsError(error.toString()));
    }
  };
};

export const addTimeSheet = (input, token) => {
  return async (dispatch) => {
    dispatch(postTimesheetsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`, {
        method: 'POST',
        headers: {
          token,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: input.description,
          date: input.date,
          hours: input.hours,
          task: input.task,
          employee: input.employee,
          project: input.project
        })
      });
      if (response.status == 201) {
        const data = await response.json();
        dispatch(postTimesheetsSuccess(data.data, data.message));
      } else {
        const data = await response.json();
        dispatch(postTimesheetsError(data.data));
      }
    } catch (error) {
      dispatch(postTimesheetsError(error.toString()));
    }
  };
};

export const deleteTimeSheet = (id, token) => {
  return async (dispatch) => {
    dispatch(deleteTimesheetsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
        method: 'DELETE',
        headers: {
          token,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (response.status == 204) {
        dispatch(deleteTimesheetsSuccess(id));
      } else {
        const data = await response.json();
        dispatch(deleteTimesheetsError(data.data));
      }
    } catch (error) {
      dispatch(deleteTimesheetsError(error.toString()));
    }
  };
};

export const updateTimeSheet = (input, id, token) => {
  return async (dispatch) => {
    dispatch(putTimesheetsPending);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
        method: 'PUT',
        headers: {
          token,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description: input.description,
          date: input.date,
          hours: input.hours,
          task: input.task,
          employee: input.employee,
          project: input.project
        })
      });
      if (response.status == 200) {
        const data = await response.json();
        dispatch(putTimesheetsSuccess(data.data, data.message));
      } else {
        const data = await response.json();
        dispatch(putTimesheetsError(data.data));
      }
    } catch (error) {
      dispatch(putTimesheetsError(error.toString()));
    }
  };
};
