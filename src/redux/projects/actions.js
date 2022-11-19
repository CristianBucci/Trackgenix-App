import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  CREATE_PROJECT_ERROR,
  CREATE_PROJECT_PENDING,
  CREATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR,
  UPDATE_PROJECT_PENDING,
  UPDATE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_SUCCESS,
  MESSAGE_MODAL_OPEN,
  MESSAGE_MODAL_CLOSE,
  CONFIRM_MODAL_OPEN,
  CONFIRM_MODAL_CLOSE,
  GET_BY_ID_PROJECT_PENDING,
  GET_BY_ID_PROJECT_SUCCESS,
  GET_BY_ID_PROJECT_ERROR
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

export const getByIdProjectsPending = () => {
  return {
    type: GET_BY_ID_PROJECT_PENDING
  };
};

export const getByIdProjectsSuccess = (data) => {
  return {
    type: GET_BY_ID_PROJECT_SUCCESS,
    payload: data
  };
};

export const getByIdProjectsError = (error) => {
  return {
    type: GET_BY_ID_PROJECT_ERROR,
    payload: error
  };
};

export const createProjectPending = () => {
  return {
    type: CREATE_PROJECT_PENDING
  };
};

export const createProjectSuccess = (data, message) => {
  return {
    type: CREATE_PROJECT_SUCCESS,
    payload: data,
    msg: message
  };
};

export const createProjectError = (error) => {
  return {
    type: CREATE_PROJECT_ERROR,
    payload: error
  };
};

export const updateProjectPending = () => {
  return {
    type: UPDATE_PROJECT_PENDING
  };
};

export const updateProjectSuccess = (data, message) => {
  return {
    type: UPDATE_PROJECT_SUCCESS,
    payload: data,
    msg: message
  };
};

export const updateProjectError = (error) => {
  return {
    type: UPDATE_PROJECT_ERROR,
    payload: error
  };
};

export const deleteProjectPending = () => {
  return {
    type: DELETE_PROJECT_PENDING
  };
};

export const deleteProjectSuccess = (payload) => {
  return {
    type: DELETE_PROJECT_SUCCESS,
    payload
  };
};

export const deleteProjectError = () => {
  return {
    type: DELETE_PROJECT_ERROR
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
