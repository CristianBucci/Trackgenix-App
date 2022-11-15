import {
  getTimesheetsPending,
  getTimesheetsSuccess,
  getTimesheetsError,
  deleteTimesheetsPending,
  deleteTimesheetsSuccess,
  deleteTimesheetsError,
  postTimesheetsPending,
  postTimesheetsSuccess,
  postTimesheetsError
} from './actions';

export const getTimesheets = () => {
  return async (dispatch) => {
    dispatch(getTimesheetsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`);
      const data = await response.json();
      dispatch(getTimesheetsSuccess(data.data));
    } catch (error) {
      dispatch(getTimesheetsError(error.toString()));
    }
  };
};

export const addTimeSheet = (input) => {
  return async (dispatch) => {
    dispatch(postTimesheetsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets`, {
        method: 'POST',
        headers: {
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

export const deleteTimeSheet = (id) => {
  return async (dispatch) => {
    dispatch(deleteTimesheetsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
        method: 'DELETE'
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
