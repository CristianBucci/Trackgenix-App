import { getTimeSheetsLoading, getTimeSheetsSuccess, getTimeSheetsError } from './actions';

export const getTimeSheets = () => {
  return async (dispatch) => {
    dispatch(getTimeSheetsLoading());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheetsA`);
      const data = await response.json();
      dispatch(getTimeSheetsSuccess(data.data));
    } catch (error) {
      dispatch(getTimeSheetsError(error.toString()));
    }
  };
};
