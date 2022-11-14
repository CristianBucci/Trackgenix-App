import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  CLOSE_MESSAGE_MODAL
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
