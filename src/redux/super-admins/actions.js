import {
  GET_SUPER_ADMIN_PENDING,
  GET_SUPER_ADMIN_SUCCESS,
  GET_SUPER_ADMIN_ERROR,
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

export const messageModalClose = () => {
  return {
    type: CLOSE_MESSAGE_MODAL
  };
};
