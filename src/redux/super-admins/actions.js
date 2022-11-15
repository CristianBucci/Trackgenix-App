import {
  GET_SUPER_ADMIN_PENDING,
  GET_SUPER_ADMIN_SUCCESS,
  GET_SUPER_ADMIN_ERROR,
  DELETE_SUPER_ADMIN_PENDING,
  DELETE_SUPER_ADMIN_SUCCESS,
  DELETE_SUPER_ADMIN_ERROR,
  CLOSE_MESSAGE_MODAL
} from './constants';

export const getSuperAdminPending = () => {
  return {
    type: GET_SUPER_ADMIN_PENDING
  };
};

export const getSuperAdminSuccess = (data) => {
  return {
    type: GET_SUPER_ADMIN_SUCCESS,
    payload: data
  };
};

export const getSuperAdminError = (error) => {
  return {
    type: GET_SUPER_ADMIN_ERROR,
    payload: error
  };
};

export const deleteSuperAdminsPending = () => {
  return {
    type: DELETE_SUPER_ADMIN_PENDING
  };
};

export const deleteSuperAdminsSuccess = (data) => {
  return {
    type: DELETE_SUPER_ADMIN_SUCCESS,
    payload: data
  };
};

export const deleteSuperAdminsError = (error) => {
  return {
    type: DELETE_SUPER_ADMIN_ERROR,
    payload: error
  };
};

export const messageModalClose = () => {
  return {
    type: CLOSE_MESSAGE_MODAL
  };
};
