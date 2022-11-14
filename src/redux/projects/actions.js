import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  CLOSE_MESSAGE_MODAL,
  DELETE_PROJECTS_ERROR,
  DELETE_PROJECTS_PENDING,
  DELETE_PROJECTS_SUCCESS
} from './constants';

export const getProjectsPending = () => {
  return {
    type: GET_PROJECTS_PENDING
  };
};

export const getProjectsSuccess = (data) => {
  return {
    type: GET_PROJECTS_SUCCESS,
    payload: data
  };
};

export const getProjectsError = (error) => {
  return {
    type: GET_PROJECTS_ERROR,
    payload: error
  };
};

export const messageModalClose = () => {
  return {
    type: CLOSE_MESSAGE_MODAL
  };
};

export const deleteProjectPending = () => {
  return {
    type: DELETE_PROJECTS_PENDING
  };
};

export const deleteProjectSuccess = (payload) => {
  return {
    type: DELETE_PROJECTS_SUCCESS,
    payload
  };
};

export const deleteProjectError = () => {
  return {
    type: DELETE_PROJECTS_ERROR
  };
};
