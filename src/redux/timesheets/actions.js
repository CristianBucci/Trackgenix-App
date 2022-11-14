import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  POST_TIMESHEETS_PENDING,
  POST_TIMESHEETS_SUCCES,
  POST_TIMESHEETS_ERROR,
  CLOSE_MESSAGE_MODAL,
  OPEN_CONFIRM_MODAL
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

export const postTimesheetsPending = () => {
  return {
    type: POST_TIMESHEETS_PENDING
  };
};

export const postTimesheetsSuccess = (data, msg) => {
  return {
    type: POST_TIMESHEETS_SUCCES,
    payload: data,
    reqMessage: msg
  };
};

export const postTimesheetsError = (error) => {
  return {
    type: POST_TIMESHEETS_ERROR,
    payload: error
  };
};

export const messageModalClose = () => {
  return {
    type: CLOSE_MESSAGE_MODAL
  };
};

export const openConfirmModal = (content) => {
  return {
    type: OPEN_CONFIRM_MODAL,
    payload: content
  };
};
