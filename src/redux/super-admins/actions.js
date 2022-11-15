import {
  GET_SUPER_ADMINS_PENDING,
  GET_SUPER_ADMINS_SUCCESS,
  GET_SUPER_ADMINS_ERROR,
  POST_SUPER_ADMINS_ERROR,
  POST_SUPER_ADMINS_PENDING,
  POST_SUPER_ADMINS_SUCCESS,
  UPDATE_SUPER_ADMINS_ERROR,
  UPDATE_SUPER_ADMINS_PENDING,
  UPDATE_SUPER_ADMINS_SUCCESS,
  DELETE_SUPER_ADMINS_PENDING,
  DELETE_SUPER_ADMINS_SUCCESS,
  DELETE_SUPER_ADMINS_ERROR,
  CLOSE_MESSAGE_MODAL
} from './constants';

export const getSuperAdminPending = () => {
  return {
    type: GET_SUPER_ADMINS_PENDING
  };
};

export const getSuperAdminSuccess = (data) => {
  return {
    type: GET_SUPER_ADMINS_SUCCESS,
    payload: data
  };
};

export const getSuperAdminError = (error) => {
  return {
    type: GET_SUPER_ADMINS_ERROR,
    payload: error
  };
};

export const postSuperAdminsPending = () => {
  return {
    type: POST_SUPER_ADMINS_PENDING
  };
};

export const postSuperAdminsSuccess = (data) => {
  return {
    type: POST_SUPER_ADMINS_SUCCESS,
    payload: data
  };
};

export const postSuperAdminsError = (error) => {
  return {
    type: POST_SUPER_ADMINS_ERROR,
    payload: error
  };
};

export const updateSuperAdminsPending = () => {
  return {
    type: UPDATE_SUPER_ADMINS_PENDING
  };
};

export const updateSuperAdminsSuccess = (data) => {
  return {
    type: UPDATE_SUPER_ADMINS_SUCCESS,
    payload: data
  };
};

export const updateSuperAdminsError = (error) => {
  return {
    type: UPDATE_SUPER_ADMINS_ERROR,
    payload: error
  };
};

export const deleteSuperAdminsPending = () => {
  return {
    type: DELETE_SUPER_ADMINS_PENDING
  };
};

export const deleteSuperAdminsSuccess = (data) => {
  return {
    type: DELETE_SUPER_ADMINS_SUCCESS,
    payload: data
  };
};

export const deleteSuperAdminsError = (error) => {
  return {
    type: DELETE_SUPER_ADMINS_ERROR,
    payload: error
  };
};

export const messageModalClose = () => {
  return {
    type: CLOSE_MESSAGE_MODAL
  };
};
