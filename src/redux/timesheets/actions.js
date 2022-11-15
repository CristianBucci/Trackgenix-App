import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  DELETE_TIMESHEETS_PENDING,
  DELETE_TIMESHEETS_SUCCES,
  DELETE_TIMESHEETS_ERROR,
  POST_TIMESHEETS_PENDING,
  POST_TIMESHEETS_SUCCES,
  POST_TIMESHEETS_ERROR,
  MESSAGE_MODAL_OPEN,
  MESSAGE_MODAL_CLOSE,
  CONFIRM_MODAL_OPEN,
  CONFIRM_MODAL_CLOSE
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

export const deleteTimesheetsPending = () => {
  return {
    type: DELETE_TIMESHEETS_PENDING
  };
};

export const deleteTimesheetsSuccess = (data) => {
  return {
    type: DELETE_TIMESHEETS_SUCCES,
    payload: data
  };
};

export const deleteTimesheetsError = (error) => {
  return {
    type: DELETE_TIMESHEETS_ERROR,
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

export const messageModalOpen = (content) => {
  return {
    type: MESSAGE_MODAL_OPEN,
    payload: content
  };
};

export const messageModalClose = () => {
  return {
    type: MESSAGE_MODAL_CLOSE
  };
};

export const confirmModalOpen = (content) => {
  return {
    type: CONFIRM_MODAL_OPEN,
    payload: content
  };
};

export const confirmModalClose = () => {
  return {
    type: CONFIRM_MODAL_CLOSE
  };
};
