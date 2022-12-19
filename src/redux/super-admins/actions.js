import {
  GET_SUPER_ADMINS_PENDING,
  GET_SUPER_ADMINS_SUCCESS,
  GET_SUPER_ADMINS_ERROR,
  GET_BY_ID_SUPER_ADMINS_PENDING,
  GET_BY_ID_SUPER_ADMINS_SUCCESS,
  GET_BY_ID_SUPER_ADMINS_ERROR,
  POST_SUPER_ADMINS_ERROR,
  POST_SUPER_ADMINS_PENDING,
  POST_SUPER_ADMINS_SUCCESS,
  UPDATE_SUPER_ADMINS_ERROR,
  UPDATE_SUPER_ADMINS_PENDING,
  UPDATE_SUPER_ADMINS_SUCCESS,
  DELETE_SUPER_ADMINS_PENDING,
  DELETE_SUPER_ADMINS_SUCCESS,
  DELETE_SUPER_ADMINS_ERROR,
  MESSAGE_MODAL_OPEN,
  MESSAGE_MODAL_CLOSE,
  CONFIRM_MODAL_OPEN,
  CONFIRM_MODAL_CLOSE,
  PASSWORD_MODAL_OPEN,
  PASSWORD_MODAL_CLOSE
} from './constants';

export const getSuperAdminsPending = () => {
  return {
    type: GET_SUPER_ADMINS_PENDING
  };
};

export const getSuperAdminsSuccess = (data) => {
  return {
    type: GET_SUPER_ADMINS_SUCCESS,
    payload: data
  };
};

export const getSuperAdminsError = (error) => {
  return {
    type: GET_SUPER_ADMINS_ERROR,
    payload: error
  };
};
export const getByIdSuperAdminsPending = () => {
  return {
    type: GET_BY_ID_SUPER_ADMINS_PENDING
  };
};

export const getByIdSuperAdminsSucces = (data) => {
  return {
    type: GET_BY_ID_SUPER_ADMINS_SUCCESS,
    payload: data
  };
};

export const getByIdSuperAdminsError = (error) => {
  return {
    type: GET_BY_ID_SUPER_ADMINS_ERROR,
    payload: error
  };
};

export const postSuperAdminPending = () => {
  return {
    type: POST_SUPER_ADMINS_PENDING
  };
};

export const postSuperAdminSuccess = (data) => {
  return {
    type: POST_SUPER_ADMINS_SUCCESS,
    payload: data
  };
};

export const postSuperAdminError = (error) => {
  return {
    type: POST_SUPER_ADMINS_ERROR,
    payload: error
  };
};

export const updateSuperAdminPending = () => {
  return {
    type: UPDATE_SUPER_ADMINS_PENDING
  };
};

export const updateSuperAdminSuccess = (data) => {
  return {
    type: UPDATE_SUPER_ADMINS_SUCCESS,
    payload: data
  };
};

export const updateSuperAdminError = (error) => {
  return {
    type: UPDATE_SUPER_ADMINS_ERROR,
    payload: error
  };
};

export const deleteSuperAdminPending = () => {
  return {
    type: DELETE_SUPER_ADMINS_PENDING
  };
};

export const deleteSuperAdminSuccess = (data) => {
  return {
    type: DELETE_SUPER_ADMINS_SUCCESS,
    payload: data
  };
};

export const deleteSuperAdminError = (error) => {
  return {
    type: DELETE_SUPER_ADMINS_ERROR,
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
