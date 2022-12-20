import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  GETBYID_ADMINS_PENDING,
  GETBYID_ADMINS_SUCCESS,
  GETBYID_ADMINS_ERROR,
  POST_ADMINS_PENDING,
  POST_ADMINS_SUCCESS,
  POST_ADMINS_ERROR,
  UPDATE_ADMINS_PENDING,
  UPDATE_ADMINS_SUCCESS,
  UPDATE_ADMINS_ERROR,
  DELETE_ADMINS_PENDING,
  DELETE_ADMINS_SUCCESS,
  DELETE_ADMINS_ERROR,
  MESSAGE_MODAL_OPEN,
  MESSAGE_MODAL_CLOSE,
  CONFIRM_MODAL_OPEN,
  CONFIRM_MODAL_CLOSE,
  PASSWORD_MODAL_OPEN,
  PASSWORD_MODAL_CLOSE
} from './constants';

export const getAdminsPending = () => {
  return {
    type: GET_ADMINS_PENDING
  };
};

export const getAdminsSuccess = (data) => {
  return {
    type: GET_ADMINS_SUCCESS,
    payload: data
  };
};

export const getAdminsError = (error) => {
  return {
    type: GET_ADMINS_ERROR,
    payload: error
  };
};
export const getByIdAdminsPending = () => {
  return {
    type: GETBYID_ADMINS_PENDING
  };
};

export const getByIdAdminsSuccess = (data) => {
  return {
    type: GETBYID_ADMINS_SUCCESS,
    payload: data
  };
};

export const getByIdAdminsError = (error) => {
  return {
    type: GETBYID_ADMINS_ERROR,
    payload: error
  };
};

export const createAdminsPending = () => {
  return {
    type: POST_ADMINS_PENDING
  };
};

export const createAdminsSuccess = (data) => {
  return {
    type: POST_ADMINS_SUCCESS,
    payload: data
  };
};

export const createAdminsError = (error) => {
  return {
    type: POST_ADMINS_ERROR,
    payload: error
  };
};

export const updateAdminsPending = () => {
  return {
    type: UPDATE_ADMINS_PENDING
  };
};

export const updateAdminsSuccess = (data) => {
  return {
    type: UPDATE_ADMINS_SUCCESS,
    payload: data
  };
};

export const updateAdminsError = (error) => {
  return {
    type: UPDATE_ADMINS_ERROR,
    payload: error
  };
};

export const deleteAdminsPending = () => {
  return {
    type: DELETE_ADMINS_PENDING
  };
};

export const deleteAdminsSuccess = (data) => {
  return {
    type: DELETE_ADMINS_SUCCESS,
    payload: data
  };
};

export const deleteAdminsError = (error) => {
  return {
    type: DELETE_ADMINS_ERROR,
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
export const passwordModalOpen = () => {
  return {
    type: PASSWORD_MODAL_OPEN
  };
};

export const passwordModalClose = () => {
  return {
    type: PASSWORD_MODAL_CLOSE
  };
};
