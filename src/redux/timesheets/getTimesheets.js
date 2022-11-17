import { getTimesheetsPending, getTimesheetsSuccess, getTimesheetsError } from './actions';

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
