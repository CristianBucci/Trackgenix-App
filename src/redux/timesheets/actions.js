import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  TOGGLE_MESSAGE_MODAL
} from './constants';

export const getTimesheetsPending = () => {
  return {
    type: GET_TIMESHEETS_PENDING
  };
};

export const getTimesheetsSuccess = (data) => {
  return {
    type: GET_TIMESHEETS_SUCCESS,
    payload: data
  };
};

export const getTimesheetsError = (error) => {
  return {
    type: GET_TIMESHEETS_ERROR,
    payload: error
  };
};

export const toggleModalClose = () => {
  return {
    type: TOGGLE_MESSAGE_MODAL
  };
};
