import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  TOGGLE_MESSAGE_MODAL
} from './constants';

export const getTimeSheetsLoading = () => {
  return {
    type: GET_TIMESHEETS_PENDING
  };
};

export const getTimeSheetsSuccess = (data) => {
  return {
    type: GET_TIMESHEETS_SUCCESS,
    payload: data
  };
};

export const getTimeSheetsError = (error) => {
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
